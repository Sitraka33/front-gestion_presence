import React, { useEffect, useState } from "react";
import Layout from "./layout";
import Loading from "./loading";
import "../style/fiche.css";
import men_success from "../assets/men_success.png";
import pointage_success from "../assets/pointage_reussi.png";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabFicheProf from "./tabFicheProf";
import ModalSuccess from "./modal/modalSuccess";

function Fiche() {
  const location = useLocation();
  const navigate = useNavigate();
  const [etudiant, setEtudiant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataCreateFiche, setDataCreateFiche] = useState({});
  const [absent, setAbsent] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [wait, setWait] = useState([]);
  var dataAbs;
  var absentsShow;
  const { classe, mention, date, heure, matiere, purpose, codehoraire, prof } =
    location.state;
  const codeens = localStorage.getItem('matricule');
  const [data, setData] = useState([]);
  const compte = localStorage.getItem('poste');

  const postFiche = async () => {
    try {
      const splitDate = dataCreateFiche.dateabs.split("-");
      var date;
      if (purpose === "create") {
        date = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
      } else {
        date = dataCreateFiche.dateabs;
      }
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/fiche",
        {
          classe: dataCreateFiche.classe,
          dateabs: date,
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

  const deleteFiche = async (code) => {
    try {
      const response = await Axios.delete(
        "https://eni-service-gestionpresence.onrender.com/fiche/"+code

      );

      console.log(response.data)
    } catch (error) {
      console.log("Error fiche : " + error.name);
    }
  };
  const postAbs = async (body) => {
    try {
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/absence",
        body
      );
      console.log(response.data);
      // navigate("/listeFiche");
      setLoading(false);
      setOpenModal(true);
    } catch (error) {
      console.log("Error ABS : " + error.message);
    }
  };

  const updateAbs = async (body) => {
    try {
      const response = await Axios.put(
        "https://eni-service-gestionpresence.onrender.com/absence",
        body
      );
      console.log(response.data);
      // navigate("/listeFiche");

      setLoading(false);
      setOpenModal(true);
    } catch (error) {
      console.log("Error ABS : " + error.message);
    }
  };

  const getEtudiants = async () => {
    try {
      const response = await Axios.post(
        "https://eni-service-gestionpresence.onrender.com/etudiant",
        { classe: classe + " " + mention }
      );

      setEtudiant(response.data);
    } catch (error) {
      console.log("Error : " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const getAbsents = async () => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/absence/" +
          codehoraire
      );

      setAbsent(response.data);
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };

  const getAbsentsShow = async (code) => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/absence/" +
          code
      );

      absentsShow = response.data;
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };

  useEffect(() => {
    if (purpose === "show") {
      getAbsents();
    }
  }, []);
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
  };

  function traiterData(data, compte) {
    if (compte === "prof" && purpose === "create")
      return data.filter((item) => item.statut === 2 || item.statut === 3);
    else if (compte === "prof" && purpose === "show")
      return data.filter((item) => item.statut === 2 || item.statut === 3);
    else return data.filter((item) => item.statut === 3 || item.statut === 2);
  }

  function closeModal() {
    setOpenModal(false);
    navigate("/listeFiche");
  }

  const handleSubmit = async (event) => {
    if (data.some((ligne) => ligne.statut === 0)) {
      toast.error("Pointage incomplet", { position: toast.POSITION.TOP_RIGHT });
    } else {
      setWait(true)
      setLoading(true)
      if (compte === "prof" && purpose === "create") {
        try {
          event.preventDefault();
          await postFiche();
          const body = traiterData(data, compte).map((item) => ({
            codemat: dataAbs.codemat,
            codehoraire: dataAbs.codehoraire,
            im: item.matricule,
          }));
          await postAbs(body);
        } catch (error) {
          console.log(
            "Erreur lors de la soumission du formulaire : " + error.message
          );
        }
      } else if (compte === "prof" && purpose === "show") {
        console.log(codehoraire);
        try {
          event.preventDefault();

          const matriculesJust = traiterData(data, compte)
          .filter((item) => item.statut === 3)
          .map((item) => item.matricule);

          await deleteFiche(codehoraire);

          await postFiche();

          const body = traiterData(data, compte).map((item) => ({
            codemat: dataAbs.codemat,
            codehoraire: dataAbs.codehoraire,
            im: item.matricule,
          }));
          await postAbs(body);

          await getAbsentsShow(dataAbs.codehoraire);
          const bodyJust = absentsShow
          .filter((item) => matriculesJust.includes(item.im))
          .map((item) => ({
            codeabs: item.codeabs,
            motifabs: "ok",
          }));

          await updateAbs(bodyJust)
        } catch (error) {
          console.log(
            "Erreur lors de la soumission du formulaire : " + error.message
          );
        }


        
      } else {
        const matriculesJust = traiterData(data, compte)
          .filter((item) => item.statut === 3)
          .map((item) => item.matricule);

        const matriculesNonJust = traiterData(data, compte)
          .filter((item) => item.statut === 2)
          .map((item) => item.matricule);

        const bodyJust = absent
          .filter((item) => matriculesJust.includes(item.im))
          .map((item) => ({
            codeabs: item.codeabs,
            motifabs: "ok",
          }));

        const bodyNonJust = absent
          .filter((item) => matriculesNonJust.includes(item.im))
          .map((item) => ({
            codeabs: item.codeabs,
            motifabs: null,
          }));

        const body = bodyJust.concat(bodyNonJust);

        try {
          await updateAbs(body);
        } catch (error) {
          console.log(
            "Erreur lors de la soumission du formulaire : " + error.message
          );
        }
      }
    }
  };

  if (loading) {
    return <Loading type="etudiants" wait={wait} />;
  }

  return (
    <Layout>
      <ToastContainer />
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
              <span className="text-fiche">{prof}</span>
            </div>
          </div>
          <div className="card-fiche">
            <TabFicheProf
              data={etudiant}
              onUpdateData={handleUpdateData}
              purpose={purpose}
              codehoraire={codehoraire}
              compte={compte}
              absent={absent}
            />
            <div className="card-footer-fiche">
              <button onClick={handleSubmit}>Valider</button>
            </div>
          </div>
        </div>
        <ModalSuccess openModal={openModal} closeModal={closeModal}>
          <div className="modalSuccess_body">
            <div className="modalSuccess_img">
              <img src={men_success} className="img img-default" alt="Default"></img>
              <img src={pointage_success} className="img img-hover" alt="Hover" />
            </div>
            <div className="modalSuccess_message">
              <h4>Pointage réussi!</h4>
            </div>
            <div >
              <p className="message">
              Les présences des étudiants ont été enregistrées avec succès. Vous
              pouvez maintenant consulter le rapport de présence ou effectuer
              d'autres actions nécessaires.
            </p>
            </div>
            <div >
              <button className="btnSuccess_container" onClick={closeModal}>Continuer</button>
            </div>
          </div>
        </ModalSuccess>
      </div>
    </Layout>
  );
}

export default Fiche;
