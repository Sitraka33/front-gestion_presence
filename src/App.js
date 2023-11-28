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

  const PrivateRoute = ({ element, condition, redirectPath }) => {
    return condition ? element : <Navigate to={redirectPath} />;
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/createFp"
            element={<PrivateRoute element={<CreateFp />} condition={auth && create} redirectPath="/createFp" />}
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
            element={<PrivateRoute element={<ListeUtilisateur />} condition={auth && admin} redirectPath="/admin" />}
          ></Route>
          <Route path="/" element={<Navigate to="/login" />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
