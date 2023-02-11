import React from "react";
import {AddNoteForm} from "./AddNoteForm";
import Note from "./Note";

const notes = [
  {
    _id: "63e64902eda0744d11653180",
    user: "63e37e47c5e5db5dc2a08547",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem ullam neque minus perferendis at quibusdam quod esse, quasi est iure ipsam",
    description: "hello",
    tag: "rahul",
    date: "2023-02-10T13:39:14.393Z",
    __v: 0,
  },
  {
    _id: "63e64905eda0744d11653182",
    user: "63e37e47c5e5db5dc2a08547",
    title: "note 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem ullam neque minus perferendis at quibusdam quod esse, quasi est iure ipsam",
    tag: "rahul",
    date: "2023-02-10T13:39:17.825Z",
    __v: 0,
  },
  {
    _id: "63e64909eda0744d11653184",
    user: "63e37e47c5e5db5dc2a08547",
    title: "note 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem ullam neque minus perferendis at quibusdam quod esse, quasi est iure ipsam doloremque vitae voluptatum velit nulla repellendus fuga hic laudantium. Et, corporis placeat.",
    tag: "rahul",
    date: "2023-02-10T13:39:21.140Z",
    __v: 0,
  },
  {
    _id: "63e6490ceda0744d11653186",
    user: "63e37e47c5e5db5dc2a08547",
    title: "note 4",
    description: "hello",
    tag: "rahul",
    date: "2023-02-10T13:39:24.783Z",
    __v: 0,
  },
];

export default function Notes() {
  return (
    <div className="container">
      <div className="row my-3">
        <AddNoteForm />
        {notes.length !== 0 &&
          notes.map((note) => {
            const {title, description, tag, _id} = note;
            return (
                <Note
                  title={title}
                  description={description}
                  tag={tag}
                  id={_id}
                  key={_id}
                />
            );
          })}
      </div>
    </div>
  );
}
