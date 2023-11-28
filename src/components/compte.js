import React, { useEffect, useState } from "react";
import Layout from "./layout";
import Axios from "axios";
import "../style/compte.css";
import { useNavigate } from "react-router-dom";

function Compte() {
  const [password, setPassword] = useState("");
  const [newPwd_1, setNewPwd_1] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [error, setError] = useState();
  var code;
  const navigate = useNavigate();

  const nomCompte =
    localStorage.getItem("nom") + " " + localStorage.getItem("prenom");
  const matricule = localStorage.getItem("matricule");
  const compte = localStorage.getItem("poste");

  const authentifier = async () => {
    try {
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/authentification",
        {
          matricule: matricule,
          motdepasse: password,
        }
      );

      code = response.status;
    } catch (error) {
      setError(<p>Votre mot de passe actuelle est incorrect</p>);
    }
  };

  const updateMdp = async () => {
    try {
      const response = await Axios.put(
        "https://eni-service-gestionpresence.onrender.com/utilisateur",
        {
          matricule: matricule,
          motdepasse: newPwd,
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("poste");
        localStorage.removeItem("matricule");
        localStorage.removeItem("create");
        localStorage.removeItem("login");

        navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données à l'API :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPwd !== newPwd_1) {
      setError(<p>Vos nouveaux mot de passes ne se correspondent pas</p>);
    } else {
      await authentifier();

      console.log(code);
      if (code === 200) {
        console.log("ok");
        await updateMdp();
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("login")) {
      localStorage.removeItem("poste");
      localStorage.removeItem("matricule");
      localStorage.removeItem("create");
      localStorage.removeItem("login");
      localStorage.removeItem("admin");
      navigate("/");
    }
  }, []);

  return (
    <Layout>
      <div className="section-compte">
        <div className="card-container-compte">
          <div className="card-compte card-header-compte">
            <div className="information">
              <h1>Information du compte :</h1>
              {compte === "Admin" ? (
                <h2 className="center">Administrateur</h2>
              ) : (
                <div className="text-info">
                  <div>
                    <span className="label-compte">Utilisateur :</span>
                    <span className="label-compte">Matricule :</span>
                  </div>
                  <div>
                    <span className="text-compte">{nomCompte}</span>
                    <span className="text-compte">{matricule}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="card-compte card-mdp">
            <div>
              <h1>Modifier mot de passe :</h1>
              <form className="change-mdp" onSubmit={handleSubmit}>
                <span>
                  <label>Votre mot de passe actuelle :</label>
                  <input
                    type="password"
                    placeholder="Entrer votre mot de passe actuelle"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                </span>
                <span>
                  <label>Votre nouveau mot de passe :</label>
                  <input
                    type="password"
                    placeholder="Entrer votre nouveau mot de passe"
                    onChange={(e) => setNewPwd(e.target.value)}
                    required
                  ></input>
                </span>
                <span>
                  <label>Confirmer votre nouveau mot de passe :</label>
                  <input
                    type="password"
                    placeholder="Confirmer votre nouveau mot de passe"
                    onChange={(e) => setNewPwd_1(e.target.value)}
                    required
                  ></input>
                </span>
                <span className="error">{error}</span>
                <span>
                  <button>Confirmer</button>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Compte;
