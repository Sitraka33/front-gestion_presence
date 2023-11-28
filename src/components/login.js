import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import "../style/login.css";
import logo from "../assets/Logo.jpg";
import user from "../assets/user.png";
import pwd from "../assets/pwd.png";
import $ from "jquery";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Équivalent à $(document).ready()
    $("input").on("input", function () {
      if ($(this).val().trim() !== "") {
        $(this).addClass("filled");
      } else {
        $(this).removeClass("filled");
      }
    });
    return () => {
      $("input").off("input");
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(username + " " + password);
    console.log(localStorage.getItem("admin"));
    try {
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/authentification",
        {
          matricule: username,
          motdepasse: password,
        }
      );

      localStorage.setItem("login", true);
      localStorage.setItem("matricule", response.data.matricule);
      localStorage.setItem("nom", response.data.nom);
      localStorage.setItem("prenom", response.data.prenoms);

      console.log(response.data.poste);

      if (response.data.poste === "Enseignant") {
        localStorage.setItem("poste", "prof");
        localStorage.setItem("create", true);
        console.log(
          "navigate('/createFp'); ",
          localStorage.getItem("poste"),
          localStorage.getItem("create")
        );
        navigate('/createFp');
      } else if (response.data.poste === "Admin") {
        localStorage.setItem("poste", "Admin");
        localStorage.setItem("admin", true);

        console.log(
          "navigate('/admin'); ",
          localStorage.getItem("poste"),
          localStorage.getItem("create")
        );
        navigate("/admin");
      } else {
        localStorage.setItem("poste", "sco");
        localStorage.setItem("create", false);
        console.log(
          "navigate('/listeFiche'); ",
          localStorage.getItem("poste"),
          localStorage.getItem("create")
        );
        navigate("/listeFiche");
      }
    } catch (error) {
      toast.error("Matricule ou mot de passe incorrect", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <div className="card-title">
              <h4>Gestion de présence en ligne</h4>
            </div>
            <div className="card-text">
              <h1>BIENVENUE</h1>
              <p>
                Connectez - vous pour gérer la présence des étudiants et
                optimiser la suivie des absences.
              </p>
            </div>
          </div>
        </div>
        <form className="card" onSubmit={handleSubmit}>
          <div className="card-content-login">
            <span>
              <img
                className="logo"
                src={logo}
                width="60px"
                height="60px"
                alt="Logo eni"
              />
            </span>
            <div className="card-title-login">
              <h1>Se connecter</h1>
            </div>
            <div className="username">
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">
                <div className="label_user">
                  <img src={user} alt="" width="20px" height="20px" />
                  <span>Numéro matricule</span>
                </div>
              </label>
            </div>
            <div className="password">
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">
                <div className="label_user">
                  <img src={pwd} alt="" width="20px" height="20px" />
                  <span>Mot de passe</span>
                </div>
              </label>
            </div>
            <div className="pwd">
              <div className="test">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Se souvenir de moi
                  </label>
                </div>
              </div>
              <div className="test">
                <a href="#">Mot de passe oublié?</a>
              </div>
            </div>
            <div className="submit">
              <button className="bouton">Connection</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
