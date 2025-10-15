import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'
import darkmodeContext from '../Context/darkmode/darkmodeContext';
import '../App.css'

const Noteitem = (props) => {
    const { note, updateNote,handleShare } = props;
    const Context = useContext(noteContext);
    const Contextdarkmode = useContext(darkmodeContext);
    const { mode } = Contextdarkmode;
    const { deleteNote } = Context;
    return (
        <div className='col-md-3'>
            <div className={`card my-3 ice-effect ${mode === 'light' ? 'noteitem-light-mode' : 'noteitem-dark-mode'}`} >
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="bi bi-trash mx-1" style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteNote(note._id)}></i>
                            <i className="bi bi-pencil-square mx-1" style={{ color: 'blue', cursor: 'pointer' }} onClick={() => updateNote(note)}></i>
                            <i className="bi bi-share-fill mx-1" style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleShare(note._id)}></i>
                        </div>
                    </div>
                    <p className="card-text scrollable-desc">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
