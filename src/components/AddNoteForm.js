import React, {useState} from "react";

export const AddNoteForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleFormSubmit = () => {};

  return (
    <div className="col-sm-4 my-3">
      <div className="card">
        <div className="card-body">
          <form>
            <div className="m-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                value={form.title}
                onChange={handleOnChange}
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
            <button
              type="submit"
              className="btn btn-primary m-3"
              onClick={handleFormSubmit}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
