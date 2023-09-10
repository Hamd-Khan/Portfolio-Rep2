import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Sidebar from "./Sidebar";
import Main from "./Main";
// import { useNavigate} from 'react-router-dom';




function Layout() {

 const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
 const [activeNote, setActiveNote] = useState(false);
 const [showSidebar, setShowSidebar] = useState(true);
 const [isEditing, setIsEditing] = useState(false);
//  const {id} = useParams();
  
 
 


 
//  const navigate=useNavigate();

 const onAddNote = () => {
    
  
   const newNote = {
     id: uuid(),
     title: "Untitled",
     body: "",
     dateCreated: Date.now(),
   };
   setNotes([newNote, ...notes]);
   setActiveNote(newNote.id);
   const activeNoteIndex = notes.findIndex(note => note.id === activeNote.id);
   window.history.replaceState({ index: activeNoteIndex }, '', `/notes/${activeNoteIndex+2}/edit`);
   setIsEditing(true);
  //  setisEditing(True);
  };


 const onDeleteNote = (idToDelete) => {
  
   const answer = window.confirm("Are you sure?");
   if (answer) {
     setNotes(notes.filter((note) => note.id !== idToDelete));
   }
   const activeNoteIndex = notes.findIndex(note => note.id === activeNote.id);
   window.history.replaceState({ index: activeNoteIndex }, '', `/notes`);
   setIsEditing(false);
 };


 const getActiveNote = () => {
   return notes.find((note) => note.id === activeNote);
 };


 const onUpdateNote = (updatedNote) => {
  
   const arrayUpdated = notes.map((note) => {
     if (note.id === activeNote) {
       return updatedNote;
     }


     return note;
   });


   setNotes(arrayUpdated);
 };


 const toggleSidebar = () => {
   setShowSidebar(!showSidebar);
 };


 useEffect(() => {
   localStorage.setItem("notes", JSON.stringify(notes));
 }, [notes]);


 return (
   <div className="Layout">
     <div className="header">
       <div className="menu-cont">
         <h1 id="menu-sy" className="menu-symb" onClick={toggleSidebar}>
           &#9776;
         </h1>
       </div>
       <div className="main-header">
         <h1>Lotion</h1>
         <p>
           <small>Like Notion, but worse</small>
         </p>
       </div>
     </div>
     <hr></hr>
     <div className="page">
       {showSidebar && (
         <Sidebar
           notes={notes}
           onAddNote={onAddNote}
           activeNote={activeNote}
           setActiveNote={setActiveNote}
           setIsEditing={setIsEditing}
           isEditing={isEditing}
         />
       )}
       <Main
         activeNote={getActiveNote()}
         onDeleteNote={onDeleteNote}
         onUpdateNote={onUpdateNote}
         setIsEditing={setIsEditing}
         isEditing={isEditing}
         notes = {notes}

       />
     </div>
   </div>
 );
}


export default Layout;