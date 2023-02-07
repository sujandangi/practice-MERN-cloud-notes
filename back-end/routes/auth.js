const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const app = express()
app.use(express.json());

router.get("/", (req, res) => {
  res.send("I am get /api/auth");
});

router.post("/", async (req, res) => {
  console.log("REQUEST BODY: ", req.body)
  try {
    const newUser = new User(req.body)
    console.log("NEW USER: ", newUser)

    await newUser.save(); //save the user to the database
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
