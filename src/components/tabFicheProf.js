import React, { useState, useEffect } from "react";
import "../style/tab.css";

function TabFicheProf({ data, onUpdateData, purpose, codehoraire, compte, absent }) {
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
  };

  const handlePresentChange = (index) => {
    const ligneTrouvee = searchStatusByMatricule(index);

    if (ligneTrouvee.statut === 0 || ligneTrouvee.statut === 2) {
      updateStatusByMatricule(index, 1);
    } else {
      updateStatusByMatricule(index, 0);
    }
  };

  const handleAbsentChange = (index) => {
    const ligneTrouvee = searchStatusByMatricule(index);

    if (ligneTrouvee.statut === 0 || ligneTrouvee.statut === 1) {
      updateStatusByMatricule(index, 2);
    } else {
      updateStatusByMatricule(index, 0);
    }
  };

  const handleJustChange = (index) => {
    const ligneTrouvee = searchStatusByMatricule(index);
    if (ligneTrouvee.statut === 2) {
      updateStatusByMatricule(index, 3);
    } else {
      updateStatusByMatricule(index, 2);
    }
  };

  const dataFilter = donnes.filter((ligne) => {
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
    if (purpose === "create") {
      setDonnee(
        data.map((item) => ({
          matricule: item.im,
          nom: item.nometd,
          prenom: item.prenomsetd,
          statut: 0,
        }))
      );
    } else {
      const listeAbsents = absent
        .filter((absent) => absent.motifabs !== "ok")
        .map((absent) => absent.im);
      const listeMotif = absent
        .filter((absent) => absent.motifabs === "ok")
        .map((absent) => absent.im);
      setDonnee(
        data.map((item) => ({
          matricule: item.im,
          nom: item.nometd,
          prenom: item.prenomsetd,
          statut: listeAbsents.includes(item.im)
            ? 2
            : listeMotif.includes(item.im)
            ? 3
            : 1,
        }))
      );
    }
  }, [data, absent]);

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
            <th colSpan={2} className="center">
              Statut
            </th>
            <th className="center">Absence justifiée</th>
          </tr>
        </thead>
        <tbody>
          {dataFilter.map((ligne, index) => (
            <tr key={index} data={donnes}>
              <td>{ligne.matricule}</td>
              <td>{ligne.nom}</td>
              <td>{ligne.prenom}</td>
              <td className="td-point">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox__input input-present"
                    checked={ligne.statut === 1}
                    onChange={() => handlePresentChange(ligne.matricule)}
                    disabled={ligne.statut === 3 || compte !== "prof"}
                  />
                  <span className="checkbox__inner present"></span>
                </label>
              </td>
              <td className="td-point">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox__input input-absent"
                    checked={ligne.statut === 2 || ligne.statut === 3}
                    onChange={() => handleAbsentChange(ligne.matricule)}
                    disabled={compte !== "prof" || ligne.statut === 3}
                  />
                  <span className="checkbox__inner absent"></span>
                </label>
              </td>
              <td className="td-just">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox__input input-justification"
                    checked={ligne.statut === 3}
                    onChange={() => handleJustChange(ligne.matricule)}
                    disabled={ligne.statut === 1 || compte === "prof"}
                  />
                  <span className="checkbox__inner justification"></span>
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
