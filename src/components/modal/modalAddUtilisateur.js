import React, { useState, useEffect } from "react";
import "../../style/modalAddUtilisateur.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ModalAddUtilisateur({ openModal, closeModal }) {
  const navigate = useNavigate();
  const [choixEns, setChoixEns] = useState(false);
  const [choixSco, setChoixSco] = useState(false);
  const [enseignant, setEnseignant] = useState([]);
  const [scolarite, setScolarite] = useState([]);
  const [formValues, setFormValues] = useState({
    matricule: "",
    motdepasse: "",
    poste: "",
  });

  async function redirection() {
    window.location.reload();
  }

  async function getAllEnseignant() {
    try {
      const response = await axios.get(
        "https://eni-service-gestionpresence.onrender.com/enseignant"
      );
      setEnseignant(response.data);
      console.log("Enseignant recupérés:", response.data);
    } catch (error) {
      console.log("Erreur :", error);
    }
  }

  async function getAllScolarite() {
    try {
      const response = await axios.get(
        "https://eni-service-gestionpresence.onrender.com/scolarite"
      );
      setScolarite(response.data);
      console.log("Scolarité recupérés:", response.data);
    } catch (error) {
      console.log("Erreur :", error);
    }
  }

  function handleSelectPosteChange(event) {
    var selectedOption = event.target.options[event.target.selectedIndex];
    var poste = selectedOption.getAttribute("data-poste");

    //var selectValue = event.target.value;
    if (poste === "Enseignant") {
      getAllEnseignant();
      setChoixEns(true);
      setChoixSco(false);
      console.log("Enseignant choisi", enseignant);
    } else if (poste === "Scolarite") {
      getAllScolarite();
      setChoixSco(true);
      setChoixEns(false);
      console.log("Scolarité choisi", scolarite);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("miova daoly", formValues);
  }

  function handleMatriculeChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("matricule ", formValues);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;

    setFormValues((prevValues) => {
      if (name === "matricule" && value) {
        // Gestion spéciale pour le champ "Nom" pour extraire la première partie
        return {
          ...prevValues,
          [name]: value.split(" ")[0],
        };
      } else {
        return {
          ...prevValues,
          [name]: value,
        };
      }
    });

    console.log("miova daoly", formValues);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Valeurs saisies :", formValues);

    const parametre = {
      ...formValues,
      matricule: formValues.matricule.split(" ")[0],
    };

    console.log("variable parametre : ", parametre);

    try {
      const response = await axios.post(
        "https://eni-service-gestionpresence.onrender.com/utilisateur",
        parametre
      );
      console.log("Réponse de l'API :", response.data);
      redirection();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données à l'API :", error);
    }
  };

  const optionsEns = enseignant.map((ens, index) => (
    <option key={index} value={ens.codeens}>
      {ens.codeens} {ens.nomens} {ens.prenomsens}
    </option>
  ));

  const optionsSco = scolarite.map((sco, index) => (
    <option key={index} value={sco.codesco}>
      {sco.codesco} {sco.nomsco} {sco.prenomsco}
    </option>
  ));

  return (
    openModal && (
      <div className="modalAddUser-background">
        <div className="modalAddUser-container">
          <div className="modalAddUser-header">
            <div className="title-container">
              <p>Ajouter un nouvel utilisateur</p>
            </div>
            <div className="quit-btn">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
          </div>
          <div className="modalAddUser-body">
            <form onChange={handleFormChange} onSubmit={handleSubmit}>
              <label>Poste</label>
              <label className="select-poste">
                <select
                  placeholder="Poste"
                  type="text"
                  name="poste"
                  onChange={handleSelectPosteChange}
                  value={formValues.poste}
                  required
                >
                  <option value="" disabled>
                    Choisir poste
                  </option>
                  <option data-poste="Enseignant">Enseignant</option>
                  <option data-poste="Scolarite" value="Scolarite">
                    Scolarité
                  </option>
                </select>
              </label>

              <label>Nom</label>
              <label className="select-poste">
                {choixEns ? (
                  <select
                    onChange={handleMatriculeChange}
                    name="matricule"
                    value={formValues.matricule}
                    type="text"
                    required
                  >
                    <option value="" disabled>
                      {" "}
                      Choix de l'utilisateur
                    </option>
                    {optionsEns}
                  </select>
                ) : (
                  <select
                    onChange={handleMatriculeChange}
                    name="matricule"
                    value={formValues.matricule}
                    required
                  >
                    <option value="" disabled>
                      {" "}
                      Choix de l'utilisateur
                    </option>
                    {optionsSco}
                  </select>
                )}
              </label>

              <label>Mot de passe</label>
              <input
                placeholder="Mot de passe"
                type="password"
                name="motdepasse"
                onChange={handleInputChange}
                value={formValues.motdepasse}
                required
              />
              <div className="modalAddUser-footer">
                <div className="btnAdd-wrapper">
                  <button type="submit" className="btnAdd">
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* <div className="modalAddUser-footer">
             <div className="btnAdd-wrapper">
               <button type="submit" className="btnAdd" onClick={handleSubmit}>
                Ajouter
              </button> 
            </div> 
          </div> */}
        </div>
      </div>
    )
  );
}

export default ModalAddUtilisateur;
