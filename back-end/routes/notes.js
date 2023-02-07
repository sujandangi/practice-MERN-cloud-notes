const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const app = express()
app.use(express.json());

router.get("/", (req, res) => {
  res.send("I am get /api/notes");
});

router.post("/", (req, res) => {
  const note = Note(req.body);
  note.save();
  res.send(req.body);
});

router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body)
    await note.save(); //save the user to the database
    res.status(200).json(note);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
