const Modal = (props) => {
  const {
    id,              // <-- NEW: unique modal id (e.g. "addNoteModal" or "editNoteModal")
    saveText,
    note,
    onChange,
    handleFunction,
    refClose,
    ref
  } = props;

  const modalType = saveText === "Add Note" ? "Add your notes" : "Edit your notes";
  console.log(saveText)

  const titleName = saveText === "Add Note" ? "title" : "etitle";
  const descName = saveText === "Add Note" ? "description" : "edescription";
  const tagName = saveText === "Add Note" ? "tag" : "etag";
  const tagValue = saveText === "Add Note" ? note.tag : note.etag;
  const descValue = saveText === "Add Note" ? note.description : note.edescription;
  const titleValue = saveText === "Add Note" ? note.title : note.etitle;

  return (
    <div>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target={`#${id}`}>{saveText}</button>
      <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}Label`}>{modalType}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor={titleName} className="form-label">Title</label>
                  <input
                    type="text"
                    minLength={5}
                    className="form-control"
                    id={titleName}
                    name={titleName}
                    value={titleValue || ""}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={descName} className="form-label">Description</label>
                  <input
                    type="text"
                    minLength={5}
                    className="form-control"
                    id={descName}
                    name={descName}
                    value={descValue || ""}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={tagName} className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id={tagName}
                    name={tagName}
                    value={tagValue || ""}
                    onChange={onChange}
                    />
                    
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                disabled={(titleValue.length || 0) < 5 || (descValue.length || 0) < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleFunction}
              >
                {saveText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
