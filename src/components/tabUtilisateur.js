import React, { useState, useEffect, useRef } from "react";
import "../style/tabUtilisateur.css";
import axios from "axios";
import question from "../assets/question.png";
import "../style/modalEditUtilisateur.css";
import "../style/modalDeleteUtilisateur.css";
import rechercheImg from "../assets/search.png";

function TabUtilisateur() {
  const [donnees, setDonnees] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [selectedMatricule, setSelectedMatricule] = useState(null);
  const [selectedPoste, setSelectedPoste] = useState(null);
  const [selectedNom, setSelectedNom] = useState(null);
  const [selectedPrenom, setSelectedPrenom] = useState(null);
  const [matriculeDelete, setMatriculeDelete] = useState(null);
  const [nomDelete, setNomDelete] = useState(null);
  const [prenomDelete, setPrenomDelete] = useState(null);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [data, setData] = useState({
    matricule: "",
    nom: "",
    prenoms: "",
    motdepasse: "",
    poste: "",
  });

  //Récupération de la liste de tous les utilisateurs
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://eni-service-gestionpresence.onrender.com/utilisateur"
      );
      setDonnees(response.data);
    } catch (error) {
      console.log("Erreur : " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Actualisation de la page
  async function redirection() {
    window.location.reload();
  }

  //Ouverture du modal modification
  const openUpdateModal = (matricule, poste, nom, prenom) => {
    setSelectedMatricule(matricule);
    setSelectedPoste(poste);
    setSelectedNom(nom);
    setSelectedPrenom(prenom);
    setIsModalUpdateVisible(true);
  };

  //Ouverture du modal suppression
  const openDeleteModal = (matricule, nom, prenom) => {
    setMatriculeDelete(matricule);
    setNomDelete(nom);
    setPrenomDelete(prenom);
    setIsModalDeleteVisible(true);
  };

  //Fermeture des modals
  const closeDeleteModal = () => {
    setMatriculeDelete(null);
    setIsModalDeleteVisible(false);
  };

  const closeUpdateModal = () => {
    setSelectedMatricule(null);
    setIsModalUpdateVisible(false);
  };

  //Recupération du mot de passe saisie
  function handleGetMdp(e) {
    const { name, value } = e.target;
    setData({ ...data, motdepasse: value });
  }

  //
  function handleFormChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  //Fonction qui gère la suppression d'un utilisateur
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        "https://eni-service-gestionpresence.onrender.com/utilisateur/" +
          matriculeDelete
      );
      await redirection();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données à l'API :", error);
    }
  };

  //Fonction qui gère la modification d'un utilisateur à partir du modal
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const parametre = {
      matricule: selectedMatricule,
      motdepasse: data.motdepasse,
    };

    try {
      const response = await axios.put(
        "https://eni-service-gestionpresence.onrender.com/utilisateur",
        parametre
      );
      redirection();
    } catch (error) {
      console.error("Erreur lors de l'envoi des données à l'API :", error);
    }
  };

  //Gestion de la recherche
  const resultatFiltres = donnees.filter((ligne) => {
    const rechercheLowerCase = recherche.toLowerCase();
    return (
      ligne.matricule.toLowerCase().includes(rechercheLowerCase) ||
      ligne.nom.toLowerCase().includes(rechercheLowerCase) ||
      ligne.prenoms.toLowerCase().includes(rechercheLowerCase) ||
      ligne.poste.toLowerCase().includes(rechercheLowerCase)
    );
  });

  const lignesTab = resultatFiltres.map((utilisateur, index) => (
    <tr key={index}>
      <td>{utilisateur.matricule}</td>
      <td>
        {utilisateur.nom} {utilisateur.prenoms}
      </td>
      <td>{utilisateur.poste}</td>
      <td className="btn-wrapper">
        <button
          className="btn-update"
          onClick={() =>
            openUpdateModal(
              //recupère les informations concernant l'utilisateur selectionné
              utilisateur.matricule,
              utilisateur.poste,
              utilisateur.nom,
              utilisateur.prenoms
            )
          }
        ></button>
      </td>
      <td className="btn-wrapper">
        <button
          className="btn-delete"
          onClick={() =>
            openDeleteModal(
              //recupère les informations concernant l'utilisateur selectionné
              utilisateur.matricule,
              utilisateur.nom,
              utilisateur.prenoms
            )
          }
        ></button>
      </td>
    </tr>
  ));

  return (
    <div className="tab-user">
      <div className="recherche-container">
        <div className="recherche-wrapper">
          <div className="recherche-input">
            <input
              type="text"
              placeholder="Recherche par nom, matricule ou prénoms"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>
          <div className="imageRecherche-container">
            <div className="imgRecherche-wrapper">
              <img src={rechercheImg} className="img-add" ></img>
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Poste</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>{lignesTab}</tbody>
      </table>

      {isModalUpdateVisible && (
        <div className="modalEditUser-backgound">
          <div className="modalEditUser-container">
            <div className="modalEditUser-header">
              <div className="title-container">
                <p>Modifier un nouvel utilisateur</p>
              </div>
              <div className="quit-btn">
                <span className="close" onClick={closeUpdateModal}>
                  &times;
                </span>
              </div>
            </div>
            <div className="modalEditUser-body">
              <form onChange={handleFormChange} onSubmit={handleSubmitUpdate}>
                <label>Matricule</label>
                <input
                  type="text"
                  name="matricule"
                  value={selectedMatricule}
                  disabled
                ></input>

                <label>Poste</label>
                <input
                  type="text"
                  name="poste"
                  value={selectedPoste}
                  disabled
                ></input>

                <label>Nom de l'utilisateur</label>
                <input
                  type="texte"
                  name="nom"
                  value={selectedNom + "  " + selectedPrenom}
                  disabled
                ></input>

                <label>Mot de passe</label>
                <input
                  required
                  placeholder="Mot de passe"
                  type="password"
                  name="motdepasse"
                  onChange={handleGetMdp}
                  value={data.motdepasse}
                ></input>

                <div className="modalEditUser-footer">
                  <div className="btnEdit-wrapper">
                    <button type="submit" className="btnEdit">
                      Modifier
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isModalDeleteVisible && (
        <div className="modalDeletetUser-backgound">
          <div className="modalDeleteUser-container">
            <div className="modalDeleteUser-header">
              <div className="quit-btn">
                <span className="close" onClick={closeDeleteModal}>
                  &times;
                </span>
              </div>
            </div>
            <div className="modalDeleteUser-body">
              <div className="image-container">
                <img src={question} className="image-question"></img>
              </div>
              <div className="modalDeleteUser-message">
                <p>
                  Voulez-vous vraiment supprimer l'utilisateur:{" "}
                  {matriculeDelete} {nomDelete} {""} {prenomDelete}
                </p>
              </div>
            </div>
            <div className="modalDeleteUser-footer">
              <div className="btnDelete-wrapper">
                <button
                  type="submit"
                  className="btnDelete"
                  onClick={handleDelete}
                >
                  Supprimer
                </button>
                <button
                  type="submit"
                  className="btnAnnuler"
                  onClick={closeDeleteModal}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TabUtilisateur;
