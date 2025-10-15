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
  const { notes, getNote, editNote ,shareNote} = Context;
  const [note, setNote] = useState({ id: "", etitle: "", edesc: "", etag: "" })
  const ref = useRef(null)
  const refClose = useRef(null)
  const refShare = useRef(null)
  const [collabemail,setCollabemail] = useState({email: ""});
  const [shareNoteId, setShareNoteId] = useState(null);
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
const onEmailChange=(e)=>{
setCollabemail({[e.target.name]: e.target.value})
}
const handleShare = (noteID)=>{
  refShare.current.click();
  setShareNoteId(noteID);
}
const handleShareSubmit=()=>{
  shareNote(shareNoteId,collabemail.collabemail);
  setCollabemail({email: ""});
  setShareNoteId(null);
  refClose.current.click();
}

console.log(collabemail.collabemail,shareNoteId);
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
      <button ref={refShare} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target=
      "#sharemodal"></button>
      <div className="modal fade" id="sharemodal" tabIndex="-1" aria-labelledby={`sharemodelLabel`} aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button ref={refClose} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form className='my-3'>
              <div className="mb-3">
                <label htmlFor="collabemail" className="form-label">Email</label>
                <input type="email" className="form-control" name="collabemail" id="collabemail" aria-describedby="emailHelp" onChange={onEmailChange} value={collabemail.email} autoComplete="off" />
                <div id="emailHelp" className="form-text">Enter the email of the user you want to share this note with.</div>
              </div>
            </form>
          </div>
            <div className="modal-footer">
              <button 
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  handleShareSubmit();
                }}
              >
                Share Note
              </button>
            </div>
        </div>
      </div>
      </div>
  
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
            <Noteitem key={note._id} note={note} updateNote={updateNote} handleShare={handleShare} />
          ))}
      </div>
    </>
  )
}

export default Notes
