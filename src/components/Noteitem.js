import React, { useContext } from 'react'
import noteContext from '../context/note/noteContext';
function Noteitem(props) {
    const context=useContext(noteContext);
    const {deletenote} =context;
    const { note,updatenote} = props;
    return (
        <>
            <div>
                <div className="card my-2 row-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.tittle}</h5>
                        <p className="crd-text">{note.description}</p> <i className="fas fa-trash-alt" onClick={()=>{deletenote(note._id)}}></i>
                        <i className="fas fa-edit" onClick={()=>{updatenote(note)}}></i>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Noteitem
