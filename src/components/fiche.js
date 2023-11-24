import React, { useEffect, useState } from "react";
import Layout from "./layout";
import "../style/fiche.css";
import "../style/loading.css";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import TabFicheProf from "./tabFicheProf";

function Fiche() {
  const location = useLocation();
  const navigate = useNavigate();
  const [etudiant, setEtudiant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataCreateFiche, setDataCreateFiche] = useState({});
  var dataAbs;
  const { classe, mention, date, heure, matiere } = location.state;
  const codeens = "ENI00387";
  const [data, setData] = useState([]);

  const postFiche = async () => {
    try {
      console.log(dataCreateFiche)
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/fiche",
        {
          classe: dataCreateFiche.classe,
          dateabs: dataCreateFiche.dateabs,
          heure: dataCreateFiche.heure,
          matiere: dataCreateFiche.matiere,
          codeens: dataCreateFiche.codeens,
        }
      );
      dataAbs = response.data;
    } catch (error) {
      console.log("Error fiche : " + error.name);
    }
  };

  const postAbs = async () => {
    try {
      console.log({codemat : dataAbs.codemat, codehoraire : dataAbs.codehoraire, im : "2020"})
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/absence",
        { codemat : dataAbs.codemat, codehoraire : dataAbs.codehoraire, im : "2020" }
      );
      console.log(response.data);
      navigate("/listeFiche")
    } catch (error) {
      console.log("Error ABS : " + error.message);
    }
  };

  const getEtudiants = async () => {
    try {
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/etudiant",
        { classe: dataCreateFiche.classe }
      );

      setEtudiant(response.data);
      console.log(response.status, " ", response.data);
      // etudiant = response.data
    } catch (error) {
      console.log("Error : " + error.message);
    } finally {
      setLoading(false); // Indiquer que le chargement est terminé, que ce soit réussi ou non
    }
  };

  useEffect(() => {
    setDataCreateFiche({
      classe: classe + " " + mention,
      dateabs: date,
      heure: heure,
      matiere: matiere,
      codeens: codeens,
    });
    getEtudiants();
  }, []);

  const handleUpdateData = (newData) => {
    setData(newData);
    // data = newData
  };

  function traiterData(data) {
    return data.filter((item) => item.statut === 2);
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      console.log(traiterData(data));
      await postFiche();
      await postAbs();
    } catch (error) {
      // Gérer les erreurs ici
      console.log(
        "Erreur lors de la soumission du formulaire : " + error.message
      );
    }
  };

  if (loading) {
    return (
      <div className="container-loading">
        <div className="loading">
          <div className="loading-icon">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="loading-text">
            <p>Chargement de la liste des élèves....</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="section-fiche">
        <div className="card-container-fiche">
          <div className="card-fiche card-header-fiche">
            <div className="card-title-fiche">
              <h1>
                FICHE DE PRESENCE DU {date} , de {heure}
              </h1>
              <span>
                <h1>=</h1>
              </span>
            </div>
            <div className="header-form-fiche">
              <span className="label-fiche">Classe :</span>
              <span className="text-fiche">
                {classe} {mention}{" "}
              </span>
              <span className="label-fiche">Matiere :</span>
              <span className="text-fiche"> {dataCreateFiche.matiere} </span>
              <span className="label-fiche">Enseignant :</span>
              <span className="text-fiche">Docteur Josué</span>
            </div>
          </div>
          <div className="card-fiche">
            <TabFicheProf data={etudiant} onUpdateData={handleUpdateData} />
            <div className="card-footer-fiche">
              <button onClick={handleSubmit}>Valider</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Fiche;
