import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import CreateFp from "./components/createFp";
import Fiche from "./components/fiche";
import ListeFiche from "./components/listeFiche";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createFp" element={<CreateFp />}></Route>
          <Route path="/fiche" element={<Fiche />}></Route>
          <Route path="/listeFiche" element={<ListeFiche />} ></Route>
          <Route path="/" element={<Navigate to="/login" />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
