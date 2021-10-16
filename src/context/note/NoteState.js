import { useState } from 'react'
import noteContext from '../note/noteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialnotes = [];
  const [notes, setnotes] = useState(initialnotes);
  //get note
  const getnote = async () => {
    const response = await fetch(`${host}/market/getitem`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const data = await response.json();
    setnotes(data);
  }

  const addnote = async (tittle, description, tag) => {
    const response = await fetch(`${host}/market/additem`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ tittle, description, tag })
    });
    const note = await response.json();
    setnotes(notes.concat(note));
    //console.log(notes)
  }
  const deletenote = async (id) => {
    const response = await fetch(`${host}/market/deleteitem/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    // const note = await response.json();
    const newnotes = notes.filter((note)=>{ return note._id !== note._id })
    //console.log(note); 
    //updatenote
    // console.log(id)
    setnotes(newnotes)
  }
  //updatenote 
  const editnote = async (id, tittle, description, tag) => {
    const response = await fetch(`${host}/market/updateitem/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ tittle, description, tag })
    });
    // const json = await response.json();
    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newnotes.length; i++) {
      const element = newnotes[i];
      if (element._id === id) {
        newnotes[i].tittle = tittle;
        newnotes[i].description = description;
        newnotes[i].tag = tag;
        break;
      }
    }
    setnotes(newnotes);
    // console.log(notes)
  }


  return (

    <noteContext.Provider value={{ getnote, notes, addnote, editnote, deletenote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
