import { useContext, useEffect, useRef ,useState } from 'react'
import { useHistory } from 'react-router';
import noteContext from '../context/note/noteContext';
import Addnote from './Addnote'
import Noteitem from './Noteitem'

function Note() {
  const context = useContext(noteContext);
  const { notes, getnote, editnote} = context;
  let history = useHistory();
  const [note, setnote] = useState({id:"",tittle:"",description:"",tag:""})
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getnote();
    }else{
      history.push('./login')
    }
  }, [])
  const ref = useRef();
  const closeref=useRef();
  const updatenote = (currentnote) => {
  //  console.log("call update note")
     ref.current.click();
    setnote({id:currentnote._id,tittle:currentnote.tittle,description:currentnote.description,tag:currentnote.tag});
  }
   
  const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value});
    }
 
    const handleClick=(e)=>{
       e.preventDefault();
        editnote(note.id,note.tittle,note.description,note.tag)
        closeref.current.click();
//        console.log("updatenote")
      
      }
    

  return (
    <>
      <Addnote />
      <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="tittle" className="form-label" name="tittle">title</label>
                  <input value={note.tittle} type="text" className="form-control" id="tittle" onChange={onChange} name="tittle" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" name="description">Description</label>
                  <input type="text"  value={note.description} className="form-control" id="description" onChange={onChange} name="description" />
                </div>
                <div className="mb-3">
                  <label htmlFor="tittle" className="form-label" name="tag">tag</label>
                  <input value={note.tag} type="text" className="form-control" id="tag" onChange={onChange} name="tag" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" ref={closeref} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="sumbit" class="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {notes.map((note) => {
          return <Noteitem note={note} updatenote={updatenote} key={note._id} />
        })
        }
      </div>

    </>
  )
}

export default Note
