import React, { useEffect,useState ,useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Main({ activeNote, onDeleteNote, onUpdateNote,setIsEditing,isEditing, notes}) {
  
  const [title, setTitle] = useState('');
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');


useEffect(() => {
  if (activeNote) {
    setTitle(activeNote.title);
    setEditorContent(activeNote.formattedBody);
  } else {
    setTitle('');
    setEditorContent('');
  }
}, [activeNote]);


  const toggleEditMode = () => {
    const activeNoteIndex = notes.findIndex(note => note.id === activeNote.id);
    window.history.replaceState({ index: activeNoteIndex }, '', `/notes/${activeNoteIndex+1}/edit`);
    setIsEditing(!isEditing);
    if (isEditing) {
      saveNote();
    } 
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
 
 
  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };
  

  const saveNote = () => {
    const newContent = quillRef.current.getEditor().root.innerHTML;
    const newDate = document.getElementById('date-input').value;
    const quill = quillRef.current.getEditor();
    const plainText = quill.getText();
    const activeNoteIndex = notes.findIndex(note => note.id === activeNote.id);
    window.history.replaceState({ index: activeNoteIndex }, '', `/notes/${activeNoteIndex+1}`);
    onUpdateNote({
      ...activeNote,
      title:title,
      formattedBody: newContent,
      body: plainText,
      dateCreated: newDate,
    });


  };



  // const onEdit = (key, value) => {
  //   onUpdateNote({
  //     ...activeNote,
  //     [key]: value,
  //     dateCreated: Date.now(),
  //   });
  // };

  if (!activeNote) {
    return <div className="not-active-note"><small>Select a note, or create a new one.</small></div>;
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="cont-text">
        {isEditing ? (
  <div className="left-side">
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      autoFocus
    />
    <div className="date-note">
      <input
        className="input-date"
        id="date-input"
        type="datetime-local"
        onChange={formatDate()}
        defaultValue={new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, -8)}
      />
    </div>
  </div>
) : (
  <div className="left-side">
    <h2 className= "title-noquill">{title}</h2>
    <div className="date-note">
      <p>{formatDate(activeNote.dateCreated)}</p>
    </div>
  </div>
)}

          <div className="right-side">
            <div id="save">
              <p onClick={toggleEditMode}>{isEditing ? 'Save' : 'Edit'}</p>
            </div>
            <div id="delete">
              <p onClick={() => onDeleteNote(activeNote.id)}>Delete</p>
            </div>
          </div>
        </div>
        
        {isEditing ? (
          <ReactQuill
            className="quill-editor"
            placeholder='Enter Your Note Here'
            value={editorContent}
            onChange={(value) => setEditorContent(value)}
            ref={quillRef}
          />
        ) : (
          <div className="quill-content" dangerouslySetInnerHTML={{__html: activeNote.formattedBody}}></div>
        )}
      </div>
    </div>
  );
}

export default Main;
