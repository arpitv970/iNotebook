import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
  {
    "_id": "61655825d1e10cd386b32617",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 1st Note",
    "description": "This is Arpit's 1st note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:40:53.743Z",
    "__v": 0
  },
  {
    "_id": "6165584bd1e10cd386b3261a",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 2nd Note",
    "description": "This is Arpit's 2nd note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:41:31.664Z",
    "__v": 0
  },
  {
    "_id": "61655825d1e10cd386b32617",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 1st Note",
    "description": "This is Arpit's 1st note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:40:53.743Z",
    "__v": 0
  },
  {
    "_id": "6165584bd1e10cd386b3261a",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 2nd Note",
    "description": "This is Arpit's 2nd note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:41:31.664Z",
    "__v": 0
  },
  {
    "_id": "61655825d1e10cd386b32617",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 1st Note",
    "description": "This is Arpit's 1st note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:40:53.743Z",
    "__v": 0
  },
  {
    "_id": "6165584bd1e10cd386b3261a",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 2nd Note",
    "description": "This is Arpit's 2nd note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:41:31.664Z",
    "__v": 0
  },
  {
    "_id": "61655825d1e10cd386b32617",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 1st Note",
    "description": "This is Arpit's 1st note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:40:53.743Z",
    "__v": 0
  },
  {
    "_id": "6165584bd1e10cd386b3261a",
    "user": "616557c1d1e10cd386b32613",
    "title": "The Arpit's 2nd Note",
    "description": "This is Arpit's 2nd note in iNotebook",
    "tag": "personal",
    "date": "2021-10-12T09:41:31.664Z",
    "__v": 0
  }
]

      const [notes, setNotes] = useState(notesInitial)
    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;