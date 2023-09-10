import {Link} from 'react-router-dom'


import { useState } from 'react';

function Sidebar({ notes, onAddNote, activeNote, setActiveNote, setIsEditing, isEditing }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <p onClick={onAddNote} className="plus-symb">
          &#43;
        </p>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredNotes.length > 0 && (
          <div id="notes-exist">{filteredNotes.length} Notes Exists</div>
        )}
      <div className="app-sidebar-notes">
        {notes.length===0 && <h3 className="No-notes">No Notes Yet</h3>}
        {notes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && notes.length !== 0 && <div id="no-note">No Notes Found</div>}
        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((note, index) => (
            <Link to={`/notes/${index + 1}`} key={note.id}>
              <div
                className={`app-sidebar-note ${
                  note.id === activeNote && 'active'
                }`}
                onClick={() => {
                  setActiveNote(note.id);
                  
                  setIsEditing(false);
                }}
              >
                <div className="sidebar-note-title">
                  <strong>{note.title}</strong>
                </div>
                <small className="note-meta">
                  {new Date(note.dateCreated).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </small>
                <p>
                {note.body ? (note.body.length < 0 ? '...' : `${note.body.substr(0, 45).replace(/<\/?[^>]+(>|$)/g, '')}...`) : '...'}

                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
