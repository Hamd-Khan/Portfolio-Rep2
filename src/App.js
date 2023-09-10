import Layout from './Layout'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import NoteDetails from './NoteDetails';



function App(){

return(
  <BrowserRouter>


  
    <div className="App"> 
    
    <div className ="content-swtich">
    <Routes>
    <Route path="/" element={<Navigate to="/notes" />} />
    <Route path="/notes" element={<Layout />}></Route>
    <Route path="/notes/:id" element={<NoteDetails />}></Route>
    <Route path="/notes/:id/edit" element={<Layout />}></Route>

    </Routes>
    

    </div>
  
  
    </div>

  </BrowserRouter>

)

};

export default App;