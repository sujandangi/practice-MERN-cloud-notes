import {useState, useEffect} from "react";
import NoteContext from "./noteContext";

export default function NoteState(props) {
  const HOST = "http://localhost:5000";
  const auth =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlOGIxMTA2MTM4YjI3N2ExYWI1ZWFhIn0sImlhdCI6MTY3NjE5NDA2NH0.Jer-kgw0ygLVvJPjSuZUtaaOHw6PedfHO40vg0kbLtg";
  const [notes, setNotes] = useState([]);

  //GetAllNotes
  const getAllNotes = async () => {
    //API Call
    try {
      const response = await fetch(`${HOST}/api/notes/getNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
      });
      const json = await response.json();

      //for client
      setNotes(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  //Add a new note
  const addNote = async (title, description, tag) => {
    //save to db POST API
    try {
      const response = await fetch(`${HOST}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
        body: JSON.stringify({title, description, tag}),
      });

      const note = await response.json();
      console.log("added: ", note);
      setNotes(notes.concat(note));
    } catch (error) {
      console.error(error.message);
    }
  };

  //Delete a note
  const deleteNote = async (id) => {
    //DELETE API for deletion on db
    try {
      const response = await fetch(`${HOST}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
      });
      const json = await response.json();
      console.log("deleted: ", json);

      //update state for client
      const newNotes = notes.filter((item) => item._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error(error.message);
    }
  };

  //Edit and Update a note
  const editNote = async (id, newTitle, newDescription, newTag) => {
    //PUT API for edit on db
    try {
      const response = await fetch(`${HOST}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": auth,
        },
        body: JSON.stringify({title: newTitle, description: newDescription, tag: newTag}),
      });
      const json = await response.json();
      console.log("Edited: ", json);
      if (!json.errors) {
        //make a deep copy of notes to update on client
        let newNotes = JSON.parse(JSON.stringify(notes));
        //edit on the client
        for (let i = 0; i < newNotes.length; i++) {
          if (newNotes[i]._id === id) {
            newNotes[i].title = newTitle;
            newNotes[i].description = newDescription;
            newNotes[i].tag = newTag;
            break;
          }
        }
        setNotes(newNotes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{notes, setNotes, addNote, deleteNote, editNote, getAllNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
