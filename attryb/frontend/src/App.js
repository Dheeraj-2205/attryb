
import './App.css';
import { Routes, Route} from "react-router-dom"
import Signup from './components/Signup/Signup';
import webfont from "webfontloader"
import Login from './components/Login/Login';
import AlloemSpecs from './components/oem_specs/AlloemSpecs';

function App() {
  webfont.load({
    google : {
      families : ["sans-serif", "Roboto", "Franklin" ]
    }
  })
  return (
    <div className="App">
      
      <Routes>
        <Route path = "/signup" element={<Signup/>}/>
        <Route path='/login' element = {<Login/>} />
        <Route path="/oemspecs" element = {<AlloemSpecs/>}/>
      </Routes>
    </div>
  );
}

export default App;
