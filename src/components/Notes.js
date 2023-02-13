import React, {useContext, useEffect, useRef, useState} from "react";
import NoteContext from "../context/notes/noteContext";
import AddNoteForm from "./AddNoteForm";
import EditNoteModal from "./EditNoteModal";
import Note from "./Note";

export default function Notes() {
  const context = useContext(NoteContext);
  const {notes, getAllNotes, editNote} = context;

  //get all notes and populate
  useEffect(() => {
    getAllNotes();
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleUpdateNote = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <div className="container">
      <div className="row my-3">
        <AddNoteForm />
        {notes.length !== 0 &&
          notes.map((note) => (
            <Note key={note._id} updateNote={updateNote} note={note} />
          ))}
        {/* Add modal to edit the note */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        ></button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <EditNoteModal
            ref={ref}
            refClose={refClose}
            handleUpdateNote={handleUpdateNote}
            onChange={onChange}
            note={note}
          />
          {/* <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder={note.etitle}
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                      minLength={3}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder={note.edescription}
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder={note.etag}
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={note.etitle.length < 5}
                  onClick={handleUpdateNote}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
