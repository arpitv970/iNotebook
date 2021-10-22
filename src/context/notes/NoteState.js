import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2NTU3YzFkMWUxMGNkMzg2YjMyNjEzIn0sImlhdCI6MTYzNDc1NTA1OX0.QL3HvloQpSMXw4zbvv5CdclP0Z5AlwvOPQZAl5nndaM",
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2NTU3YzFkMWUxMGNkMzg2YjMyNjEzIn0sImlhdCI6MTYzNDc1NTA1OX0.QL3HvloQpSMXw4zbvv5CdclP0Z5AlwvOPQZAl5nndaM",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a New Note");
    const note = {
      _id: "61655825d1e10cd386b32617",
      user: "616557c1d1e10cd386b32613",
      title: title,
      description: description,
      tag: tag,
      date: "2021-10-12T09:40:53.743Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API call
    console.log("Deleting the note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2NTU3YzFkMWUxMGNkMzg2YjMyNjEzIn0sImlhdCI6MTYzNDc1NTA1OX0.QL3HvloQpSMXw4zbvv5CdclP0Z5AlwvOPQZAl5nndaM",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
