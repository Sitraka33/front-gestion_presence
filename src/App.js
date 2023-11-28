import "./App.css";
import Login from "./components/login";
import CreateFp from "./components/createFp";
import Fiche from "./components/fiche";
import ListeFiche from "./components/listeFiche";
import Compte from "./components/compte";
import ListeUtilisateur from "./components/listeUtilisateur";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const auth = localStorage.getItem("login");
  const poste = localStorage.getItem("poste");
  const create = localStorage.getItem("create");
  const admin = localStorage.getItem("admin");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/createFp"
            element={
              (auth  && create)  ? (
                <CreateFp />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/fiche"
            element={auth ? <Fiche /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/compte"
            element={auth ? <Compte /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/listeFiche"
            element={auth ? <ListeFiche /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/admin"
            element={
              (auth && admin) ? (
                <ListeUtilisateur />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route path="/" element={<Navigate to="/login" />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
