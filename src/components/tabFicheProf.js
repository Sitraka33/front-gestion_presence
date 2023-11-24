import React, { useState, useEffect } from "react";
import "../style/tab.css";

function TabFicheProf({ data, onUpdateData }) {
  const [recherche, setRecherche] = useState("");
  const [donnes, setDonnee] = useState([]);

  const updateStatusByMatricule = (matricule, newStatus) => {
    const newData = donnes.map((item) => {
      if (item.matricule === matricule) {
        return { ...item, statut: newStatus };
      }
      return item;
    });

    setDonnee(newData);
  };  

  const searchStatusByMatricule = (matricule) => {
    return donnes.find((ligne) => ligne.matricule === matricule);
  }

  const handlePresentChange = (index) => {
    const ligneTrouvee = searchStatusByMatricule(index)

    if ((ligneTrouvee.statut === 0) || (ligneTrouvee.statut === 2)) {
      updateStatusByMatricule(index, 1);
    } else {
      updateStatusByMatricule(index, 0);
    }
  };


  const handleAbsentChange = (index) => {
    const ligneTrouvee = searchStatusByMatricule(index)

    if ((ligneTrouvee.statut === 0) || (ligneTrouvee.statut === 1)) {
      updateStatusByMatricule(index, 2);
    } else {
      updateStatusByMatricule(index, 0);
    }
  };

  const résultatsFiltrés = donnes.filter((ligne) => {
    const rechercheLowerCase = recherche.toLowerCase();
    return (
      ligne.nom.toLowerCase().includes(rechercheLowerCase) ||
      ligne.matricule.toString().includes(rechercheLowerCase) ||
      ligne.prenom.toLowerCase().includes(rechercheLowerCase)
    );
  });

  useEffect(() => {
    onUpdateData(donnes);
  }, [donnes, onUpdateData]);

  useEffect(() => {
    setDonnee(data.map((item) => ({
      matricule: item.im,
      nom: item.nometd,
      prenom: item.prenomsetd,
      statut: 0,
    })))
  }, [data]);

  return (
    <div className="tab">
      <div>
        <input
          type="text"
          placeholder="Rechercher par nom, matricule ou prénoms"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénoms</th>
            <th colSpan={2}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {résultatsFiltrés.map((ligne, index) => (
            <tr key={index} data={donnes}>
              <td>{ligne.matricule}</td>
              <td>{ligne.nom}</td>
              <td>{ligne.prenom}</td>
              <td>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox__input input-present"
                    checked={ligne.statut === 1}
                    onChange={() => handlePresentChange(ligne.matricule)}
                  />
                  <span className="checkbox__inner present"></span>
                </label>
              </td>
              <td>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox__input input-absent"
                    checked={ligne.statut === 2}
                    onChange={() => handleAbsentChange(ligne.matricule)}
                  />
                  <span className="checkbox__inner absent"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabFicheProf;
