import React, { useState, useEffect } from "react";
import "../../style/modalAddUtilisateur.css";
import axios from "axios";

function ModalAddUtilisateur({ openModal, closeModal }) {
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

  //Recupération de la liste de tous les enseignants
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

  //Recupération de la liste de tous les employées de la scolarité
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

  //Fonction permettant de charger le contenu des champs "select" selon le poste choisi
  function handleSelectPosteChange(event) {
    var selectedOption = event.target.options[event.target.selectedIndex];
    var poste = selectedOption.getAttribute("data-poste");

    if (poste === "Enseignant") {
      getAllEnseignant(); //recupère les matricules des enseignant
      setChoixEns(true);
      setChoixSco(false);
    } else if (poste === "Scolarite") {
      getAllScolarite(); //recupère les matricules des scolarités
      setChoixSco(true);
      setChoixEns(false);
    }
  }

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

  //Fonctions récupérant les valeurs des champs du formulaire
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleMatriculeChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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

  //Fonction qui gère l'ajout d'un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();

    const parametre = {
      ...formValues,
      matricule: formValues.matricule.split(" ")[0],
    };

    try {
      const response = await axios.post(
        "https://eni-service-gestionpresence.onrender.com/utilisateur",
        parametre
      );
      redirection();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données à l'API :", error);
    }
  };

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
        </div>
      </div>
    )
  );
}

export default ModalAddUtilisateur;
