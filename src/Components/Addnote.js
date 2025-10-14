import { useContext, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import darkmodeContext from '../Context/darkmode/darkmodeContext';
import '../App.css'
import Modal from './Modal';



const Addnote = () => {
  const Context = useContext(noteContext);
  const Contextdarkmode = useContext(darkmodeContext);
  const { mode } = Contextdarkmode;
  const { addNote } = Context;
  const refClose = useRef(null);
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();//to prevent reloading of page
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    refClose.current.click();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }
  return (
    <>
      <div>
        <div className={`d-flex align-items-center justify-content-between my-3 rounded py-3 px-4 w-100 ice-effect ${mode === 'light' ? 'addnote-light-mode' : 'addnote-dark-mode'}`}>
          <h1>Your notes</h1>

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNoteModal">
            Add Note
          </button>
        </div>
        <Modal
          id="addNoteModal"                     // <-- unique id
          refClose={refClose}
          handleFunction={handleClick}
          onChange={onChange}
          note={note}
          saveText="Add Note"
        />
      </div>
    </>
  )
}

export default Addnote 
