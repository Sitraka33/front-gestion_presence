import React from "react";
import Layout from "./layout";
import "../style/listeFiche.css";
import TabListeFiche from "./tabListeFiche";

function ListeFiche() {
  const prof = [
    { nom: "Josué" },
    { nom: "William" },
    { nom: "Andry Bertin" },
    { nom: "Arisena" },
  ];

  const matiere = [
    { nom: "java" },
    { nom: "python" },
    { nom: "IA" },
    { nom: "Anglais" },
  ];

  const data = [
    {date : "25/10/2023", horaire : "09:00", prof:"Mr Josué", matiere: "Python", classe: "L3"},
    {date : "26/10/2023", horaire : "07:30", prof:"Mr Josué", matiere: "IA", classe: "M1"},
    {date : "27/10/2023", horaire : "10:30", prof:"Mr Josué", matiere: "Java", classe: "M2"},
    {date : "28/10/2023", horaire : "09:00", prof:"Mr Josué", matiere: "IA", classe: "L3"},
    {date : "29/10/2023", horaire : "07:30", prof:"Mr Josué", matiere: "Anglais", classe: "L3"},
    {date : "30/10/2023", horaire : "09:00", prof:"Mr Josué", matiere: "IA", classe: "L3"},
    
  ]
  return (
    <Layout>
      <div className="section-liste">
        <div className="card-container-liste">
          <div className="card-liste card-header-liste">
            <div className="filtre-liste">
              <div className="filtre-liste-input">
                <span>Filtrer par :</span>
                <input type="date" name="date" value="" placeholder="Date" />
                <input type="time" name="heure" value="" placeholder="Heure" />
                <select>
                  <option value="">Enseignant</option>
                  {prof.map((ligne, index) => (
                    <option value={ligne.nom}>{ligne.nom}</option>
                  ))}
                </select>
                <select>
                  <option value="">Matière</option>
                  {matiere.map((ligne, index) => (
                    <option value={ligne.nom}>{ligne.nom}</option>
                  ))}
                </select>
              </div>
              <div className="filtre-liste-btn">
                    <button>Filtrer</button>
              </div>
            </div>
          </div>
          <div className="card-liste">
            <TabListeFiche data={data}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ListeFiche;
