
import './App.css';
import { Routes, Route} from "react-router-dom"
import Signup from './components/Signup/Signup';
import webfont from "webfontloader"
import Login from './components/Login/Login';
import AlloemSpecs from './components/oem_specs/AlloemSpecs';
import UpdateData from './components/updateData/UpdateData';
import CreateData from './components/create/CreateData';


function App() {
  webfont.load({
    google : {
      families : ["sans-serif", "Roboto", "Franklin" ]
    }
  });



  
  return (
    <div className="App">
      
      <Routes>
        <Route path = "/" element={<Signup/>}/>
        <Route path='/login' element = {<Login/>} />
        <Route path="/oemspecs" element = {<AlloemSpecs/>}/>
        <Route path = "/update/:id" element = {<UpdateData/>}/>
        <Route path = "/create" element = {<CreateData/>} />
      </Routes>
    </div>
  );
}

export default App;
