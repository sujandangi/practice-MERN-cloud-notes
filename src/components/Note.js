import React from "react";

export default function Note({title, description, tag, id}) {
  return (
    <div className="col-sm-4 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p>
            <code>{tag}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
