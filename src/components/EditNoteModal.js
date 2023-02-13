import React from 'react'

const EditNoteModal = ({ref, refClose, handleUpdateNote, onChange, note}) => {
  return (
    <div><div className="modal-dialog">
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
          disabled={note.etitle.length < 4}
          onClick={handleUpdateNote}
          type="button"
          className="btn btn-primary"
        >
          Update Note
        </button>
      </div>
    </div>
  </div></div>
  )
}

export default EditNoteModal