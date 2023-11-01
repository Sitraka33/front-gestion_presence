import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

    // Nettoyage de l'effet lorsque le composant est démonté
    return () => {
      // Supprimez les gestionnaires d'événements ou effectuez d'autres opérations de nettoyage si nécessaire
      $("input").off("input");
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (username === "Sitraka" && password === "123") {
        console.log("ok")
    } else {
        console.log(username +" "+ password);
        navigate('/createFp')
    }
  }

  return (
    <div className="login-page">
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
              />
              <label for="username">
                <div className="label_user">
                  <img src={user} alt="" width="20px" height="20px" />
                  <span>Nom d'utilisateur</span>
                </div>
              </label>
            </div>
            <div className="password">
              <input type="password" id="password"  onChange={e => setPassword(e.target.value)}/>
              <label for="password">
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
                  <label className="form-check-label" for="flexSwitchCheckDefault">
                    Se souvenir de moi
                  </label>
                </div>
              </div>
              <div className="test">
                <a href="#">Mot de passe oublié?</a>
              </div>
            </div>
            <div className="submit">
              <button>Connection</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
