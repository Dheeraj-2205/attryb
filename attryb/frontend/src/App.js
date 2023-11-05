
import './App.css';
import { Routes, Route} from "react-router-dom"
import Signup from './components/Signup/Signup';
import webfont from "webfontloader"
import Login from './components/Login/Login';
import AlloemSpecs from './components/oem_specs/AlloemSpecs';
import UpdateData from './components/updateData/UpdateData';
import CreateData from './components/create/CreateData';
import Header from './components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './Actions/User';
// import lo

function App() {
  webfont.load({
    google : {
      families : ["sans-serif", "Roboto", "Franklin" ]
    }
  });

 

  const {isAuthenticated} = useDispatch(state => state.user)
  console.log(isAuthenticated)
  return (
    <div className="App">
      <Header/>
      
      <Routes>
        <Route path = "/signup" element={<Signup/>}/>
        <Route path='/login' element = {isAuthenticated ? <AlloemSpecs/> :<Login/>} />
        <Route path="/oemspecs" element = {<AlloemSpecs/>}/>
        <Route path = "/update/:id" element = {<UpdateData/>}/>
        <Route path = "/create" element = {<CreateData/>} />
      </Routes>
    </div>
  );
}

export default App;
