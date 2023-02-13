import React, {useContext} from "react";
import NoteContext from "../context/notes/noteContext";

export default function Note(props) {
  const {deleteNote} = useContext(NoteContext);
  const {note, updateNote} = props;

  return (
    <div className="col-sm-4 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="mt-3">
            <code>{note.tag}</code>
          </p>
          <div className="d-flex justify-content-start">
            <button
              type="button"
              className="btn p-0 mx-1"
              onClick={() => deleteNote(note._id)}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>

            <button type="button" className="btn p-0 mx-1" onClick={() => updateNote(note)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
