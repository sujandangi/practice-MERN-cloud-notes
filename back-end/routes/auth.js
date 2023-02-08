const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require('express-validator');
const app = express()
app.use(express.json());

router.get("/", (req, res) => {
  res.send("I am get /api/auth");
});

//create a new user: /api/createuser. No login required

router.post("/createuser",[
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be minimum 5 characters').isLength({ min: 5 })
] , async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  //check for duplicate email
  try{
    let user = await User.findOne({ email: req.body.email })
    if(user){
      return res.status(400).json({ error: "Email already registered!"})
    }

    //create a new user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    })
    res.json(user)
  }
  catch (err) {
    console.error(error.message)
    res.status(500).send("Some Error Occurred")
  }
})

// router.post("/", async (req, res) => {
//   console.log("REQUEST BODY: ", req.body)
//   try {
//     const newUser = new User(req.body)
//     console.log("NEW USER: ", newUser)

//     await newUser.save(); //save the user to the database
//     res.status(200).json(newUser);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
