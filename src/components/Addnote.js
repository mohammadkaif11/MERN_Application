import React,{useContext,useState} from 'react'
import noteContext from '../context/note/noteContext'
function Addnote() {
      const context=useContext(noteContext);
      const {addnote}=context;

      const [note, setnote] = useState({tittle:"",description:"",tag:""})
  
      const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value});
    //         console.log(e.target.value)
      // console.log(note)  
    }
    const addNote=(e)=>{
        e.preventDefault();
        addnote(note.tittle,note.description,note.tag)
      }
      return (
        <div className="container">
     <h2>Add your notes</h2>
<form>
  <div className="mb-3">
    <label htmlFor="tittle" className="form-label" name="tittle">title</label>
    <input type="text" className="form-control" id="tittle"  onChange={onChange} name="tittle"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label" name="description">Description</label>
    <input type="text" className="form-control" id="description" onChange={onChange} name="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tittle" className="form-label" name="tag">tag</label>
    <input type="text" className="form-control" id="tag" onChange={onChange} name="tag"/>
  </div>  
  <button type="submit" className="btn btn-primary" onClick={addNote}>addNote</button>
</form>
<h2>Notes</h2>
 </div>
 
    )
}

export default Addnote
