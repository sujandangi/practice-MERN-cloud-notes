import React, {useState, useContext} from "react";
import NoteContext from "../context/notes/noteContext";

export default function AddNoteForm() {

  const emptyForm = {
    title: "",
    description: "",
    tag: "",
  }

  const [form, setForm] = useState(emptyForm);

  const context = useContext(NoteContext);
  const {addNote} = context;

  const handleOnChange = (e) => {
    e.preventDefault();
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    addNote(form.title, form.description, form.tag)
    setForm(emptyForm)
  };

  return (
    <div className="col-sm-4 my-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="m-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                value={form.title}
                onChange={handleOnChange}
                minLength={3}
                required
              />
            </div>
            <div className="m-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                value={form.description}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tags"
                name="tag"
                value={form.tag}
                onChange={handleOnChange}
              />
            </div>
            <button type="submit" className="btn btn-primary m-3">
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
