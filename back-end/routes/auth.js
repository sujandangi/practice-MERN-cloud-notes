const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const app = express();
app.use(express.json());

const JWT_SECRET = "$omething$ecret";

router.get("/", (req, res) => {
  res.send("I am get /api/auth");
});

//ROUTE 1: create a new user: /api/auth/createuser. No login required
//using express-validator to validate the user details
//using bcrypt to hash and salt the password
//using jwt to generate jwt token

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({min: 5}),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    //check for duplicate email
    try {
      let user = await User.findOne({email: req.body.email});
      if (user) {
        return res.status(400).json({error: "Email already registered!"});
      }

      //Hash the password
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        password: securePassword, //hashed password
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      //generate jwt token
      const authtoken = jwt.sign(data, JWT_SECRET);

      //send response
      res.json({authtoken});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

//ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required.
//User need to enter email and password which are validated.
//Password is compared with stored hashed passwords

router.post("/login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password can not be blank").exists(),
],
  async (req, res) => {
    //If errors in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    //If no errors, check whether the user exists
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if (!user) {
        return res
          .status(400)
          .json({error: "Incorrect credentials. Try again."});
      }

      //if email exists, compare the password with database
      const hasCorrectPassword = await bcrypt.compare(
        password,
        user.password
      );
      if (!hasCorrectPassword) {
        return res
          .status(400)
          .json({error: " Incorrect credentials. Try again."});
      }

      //if the user is genuine generate an authtoken and send
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });


//ROUTE 3: Get details of a loggedin User. POST "/api/auth/getuser". Login required.
//using a middleware 'fetchuser' that extracts the User id from jwt token
//middleware then modify the 'req' object and insert into it the user like so: 'req.user = decoded.user' | '{user: {id: "id"}}'

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
