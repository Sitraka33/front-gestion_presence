import React, { useEffect, useState } from "react";
import Layout from "./layout";
import Axios from "axios";
import Loading from "./loading";
import "../style/listeFiche.css";
import TabListeFiche from "./tabListeFiche";

function ListeFiche() {
  const [recherche, setRecherche] = useState({
    date: "",
    heure: "",
    prof: "",
    matiere: "",
  });

  const compte = localStorage.getItem('poste');
  const codeens = localStorage.getItem('matricule');
  const [matiere, setMatiere] = useState([])
  const [donnes, setDonnes] = useState([]);
  const [dataFilter, setDataFilter] = useState(donnes);
  const [loading, setLoading] = useState(true);
  const [prof, setProf] = useState([]);

  const getFiches = async () => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/fiche"
      );

      setDonnes(response.data);
    } catch (error) {
      console.log("Error : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFichesByProf = async () => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/ficheByEnseignant/"+codeens
      );

      setDonnes(response.data);
    } catch (error) {
      console.log("Error : " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const getMatiere = async () => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/matiere/" + codeens
      );
      setMatiere(response.data);
    } catch (error) {
      console.log("Error matiere : " + error.message);
    }
  };

  const getMatieres = async () => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/matiere"
      );
      setMatiere(response.data);
    } catch (error) {
      console.log("Error matiere : " + error.message);
    }
  };
  const getProfs = async () => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/enseignants"
      );

      setProf(response.data);
    } catch (error) {
      console.log("Error : " + error.message + codeens);
    } finally {
      setLoading(false);
    }
  };

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setRecherche({ ...recherche, [name]: value });
  }

  function handleSearch(event) {
    event.preventDefault();

    const filter = donnes.filter((ligne) => {
      const dateRecherche = recherche.date.toLowerCase();
      var date = dateRecherche;
      if (dateRecherche !== "") {
        const splitDate = dateRecherche.split("-");
        date = (
          splitDate[2] +
          "-" +
          splitDate[1] +
          "-" +
          splitDate[0]
        ).toLowerCase();
      }
      const heure = recherche.heure.toLowerCase();
      const prof = recherche.prof.toLowerCase();
      const matiere = recherche.matiere.toLowerCase();
      return (
        (date === "" || ligne.dateabs.toLowerCase().includes(date)) &&
        (heure === "" || ligne.heure.toString().includes(heure)) &&
        (prof === "" || ligne.nomens.toLowerCase().includes(prof)) &&
        (matiere === "" || ligne.matiere.toLowerCase().includes(matiere))
      );
    });

    setDataFilter(filter);
  }

  useEffect(() => {
    (compte==="prof") ? getFichesByProf() : getFiches();
    getProfs();
    (compte==="prof") ? getMatiere() : getMatieres();
    setDataFilter(donnes);
  }, []);

  useEffect(() => {
    // getFiches()
    setDataFilter(donnes);
  }, [donnes]);

  if (loading) {
    return <Loading type="fiches" />;
  }

  return (
    <Layout>
      <div className="section-liste">
        <div className="card-container-liste">
          <div className="card-liste card-header-liste">
            <div className="filtre-liste">
              <div className="filtre-liste-input">
                <span>Filtrer par :</span>
                <input
                  type="date"
                  name="date"
                  value={recherche.date}
                  onChange={handleInputChange}
                  placeholder="Date"
                />
                <input
                  type="time"
                  name="heure"
                  value={recherche.heure}
                  onChange={handleInputChange}
                  placeholder="Heure"
                />

                {compte !== "prof" && (
                  <select
                    name="prof"
                    value={recherche.prof}
                    onChange={handleInputChange}
                  >
                    <option value="">Enseignant</option>
                    {prof.map((ligne, index) => (
                      <option key={index} value={ligne.nomens}>
                        {ligne.nomens}
                      </option>
                    ))}
                  </select>
                )}

                <select
                  name="matiere"
                  value={recherche.matiere}
                  onChange={handleInputChange}
                >
                  <option value="">Matière</option>
                  {matiere.map((ligne, index) => (
                    <option key={index} value={ligne.matiere}>
                      {ligne.matiere}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filtre-liste-btn">
                <button onClick={handleSearch}>Filtrer</button>
              </div>
            </div>
          </div>
          <div className="card-liste">
            <TabListeFiche data={dataFilter} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ListeFiche;
