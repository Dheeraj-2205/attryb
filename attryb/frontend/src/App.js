
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './components/Signup/Signup';
import webfont from "webfontloader"
import Login from './components/Login/Login';

function App() {
  webfont.load({
    google : {
      families : ["sans-serif", "Roboto", "Franklin" ]
    }
  })
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/signup" element={<Signup/>}/>
        <Route path='/login' element = {<Login/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
