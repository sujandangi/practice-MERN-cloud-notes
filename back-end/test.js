const express = require("express");
const mongoose = require("mongoose");
const app = express();

// must use: middleware to parse the POST request (ex. req.body)
app.use(express.json());

// to suppress the warning
mongoose.set("strictQuery", true);

//if having issue while connecting with MongoDB try replacing "localhost:27017" with "127.0.0.1:27017"
mongoose.connect("mongodb://127.0.0.1:27017", (err) => {
  if (err) console.log("CONNECTION ERROR: ", err);
  else console.log("MONGODB CONNECTED SUCCESSFULLY");
});

// Define the MongoDB Schema for the "users" collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  password: String,
});

// Create the MongoDB Model for the "users" collection
const User = mongoose.model("User", userSchema);

// router.get("/api/testusers", (req, res) => {
//   // Create a new User document
//     const user = new User({
//       "name": "XYZ",
//       "email": "mail@mail.com",
//       "password": "1234"
//     });
//   console.log("req.body: ", req.body);
// //   const user = new User(req.body);
//   console.log("new user: ", user);

//   user.save((error, user) => {
//     if (error) {
//       console.log("SAVE ERROR: ", error);
//       return res.status(500).send(error);
//     }
//     console.log("SAVED USER: ", user);
//     res.status(201).send(user);
//   });
// });

app.get("/", (req, res) => {
  res.send("I am the get /");
});

app.post("/register", async (req, res) => {
  
  // res.status(200).json("I am get /register");
  console.log("REQUEST BODY: ", req.body)
  try {
    // const newUser = new User({
    //   name: "Rohan",
    //   email: "mail@gmail.com",
    //   password: "123456",
    // });

    const newUser = new User(req.body)
    console.log("NEW USER: ", newUser)

    await newUser.save(); //save the user to the database
    res.status(200).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
