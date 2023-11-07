import React from "react";
import Layout from "./layout";
import "../style/fiche.css";
import { useLocation, useNavigate } from "react-router-dom";
import TabFicheProf from "./tabFicheProf";

function Fiche() {
  const location = useLocation();
  const navigate = useNavigate();
  // const searchParams = new URLSearchParams(location.search);
  // const classe = searchParams.get("classe");
  // const mention = searchParams.get("mention");
  // const date = searchParams.get("date");
  // const heure = searchParams.get("heure");
  // const matiere = searchParams.get("matiere");
  const { classe, mention, date, heure, matiere } = location.state;

  var data = [
    { matricule: 2145, nom: "John", prenom: "Doe", statut: 0 },
    { matricule: 2452, nom: "Zerfin", prenom: "Sitraka", statut: 0 },
    { matricule: 6530, nom: "Zoe", prenom: "Rasoa", statut: 0 },
    { matricule: 2146, nom: "John", prenom: "Doe", statut: 0 },
    { matricule: 2147, nom: "John", prenom: "Doe", statut: 0 },
    { matricule: 2148, nom: "John", prenom: "Doe", statut: 0 },
  ];

  function handleSubmit(event) {
    event.preventDefault();

    navigate('/listeFiche')
  }

  return (
    <Layout>
      <div className="section-fiche">
        <div class="card-container-fiche">
          <div class="card-fiche card-header-fiche">
            <div class="card-title-fiche">
              <h1>
                FICHE DE PRESENCE DU {date} , de {heure}
              </h1>
              <span>
                <h1>=</h1>
              </span>
            </div>
            <div class="header-form-fiche">
              <span class="label-fiche">Class :</span>
              <span class="text-fiche">
                {classe} {mention}{" "}
              </span>
              <span class="label-fiche">Matiere :</span>
              <span class="text-fiche"> {matiere} </span>
              <span class="label-fiche">Enseignant :</span>
              <span class="text-fiche">Docteur Josué</span>
            </div>
          </div>
          <div class="card-fiche">
            <TabFicheProf data={data}/>
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
