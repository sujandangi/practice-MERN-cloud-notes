const express = require("express");
const {body, validationResult} = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const app = express();
app.use(express.json());

//ROUTE 1: Get All Notes of a user using: GET /api/notes/getnotes. Login required.
//using middleware fetchuser to verify jwt token and extract user id

router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    //using the req.user.id as modified by the fetchuser middleware
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add new Note for a user using: POST /api/notes/addnote. Login required.
//using fetchuser middleware
//using express-validator

router.post(
  "/addnote",
  fetchuser,
  [body("title", "Enter a valid title").isLength({min: 3})],
  async (req, res) => {
    try {
      const {title, description, tag} = req.body;

      //check for errors in validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      //if no errors create and save a note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Update an existing Note using: PUT api/notes/updatenote. Login required.
//PATCH can also be used to update selected fields
//uses fetchuser middleware

router.put(
  "/updatenote/:id",
  fetchuser,
  [body("title", "Enter a valid title").isLength({min: 3})],
  async (req, res) => {
    try {
      const {title, description, tag} = req.body;

      //check for errors in validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      //create a newNote
      const newNote = {};
      newNote.title = title;
      newNote.description = description;
      newNote.tag = tag;

      //find the note in db and update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      //verify whether the note being updated belongs to the loggedin user
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //update note
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        {$set: newNote},
        {new: true}
      );
      res.json({note});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 4: Delete an existing Note using: DELETE /api/notes/deletenote. Login required.
//using fetchuser middleware

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //verify if the logged in user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //delete the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({Success: "Deleted!", note: note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
