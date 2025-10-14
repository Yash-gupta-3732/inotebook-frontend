import { useContext, useEffect, useRef, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import Noteitem from './Noteitem'
import empty1 from '../Asset/empty(1).gif'
import noteContext from '../Context/notes/noteContext'
import searchContext from '../Context/search/searchContext'
import Modal from './Modal'

const Notes = () => {
  const navigate = useNavigate();
  const searchCtx = useContext(searchContext);
  const Context = useContext(noteContext);
  const { searchText } = searchCtx;
  console.log(searchText);
  const { notes, getNote, editNote } = Context;
  const [note, setNote] = useState({ id: "", etitle: "", edesc: "", etag: "" })
  const ref = useRef(null)
  const refClose = useRef(null)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    }
    else {
      navigate("/login")
    }

    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const handleEdit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); //to close the modal programmatically

  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <>
      <Modal
        id="editNoteModal"                    // <-- different id
        ref={ref}
        refClose={refClose}
        handleFunction={handleEdit}
        onChange={onChange}
        note={note}
        saveText="Update Note"
      />
      <div className='row my-3'>
        <div className='container d-flex justify-content-center' > {notes.length === 0 && <img className='mt-5' src={empty1} style={{ width: "220px" }} alt="No notes to display" />}</div>
        {notes
          .filter(note => {
            return (
              searchText === "" || // if search text is empty, show all notes
              note.title.toLowerCase().includes(searchText.toLowerCase()) ||
              note.description.toLowerCase().includes(searchText.toLowerCase()) ||
              note.tag.toLowerCase().includes(searchText.toLowerCase())
            );
          })
          .map(note => (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          ))}
      </div>
    </>
  )
}

export default Notes
