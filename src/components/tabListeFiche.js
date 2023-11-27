import React from 'react'
import { useNavigate } from 'react-router-dom';

function TabListeFiche({data}) {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const row = event.currentTarget.closest('tr');
  
    const date = row.querySelector('.date').textContent;
    const horaire = row.querySelector('.horaire').textContent;
    const prof = row.querySelector('.prof').textContent;
    const matiere = row.querySelector('.matiere').textContent;
    const classeMention = row.querySelector('.classe').textContent;
    const codehoraire = event.currentTarget.id;

    const split = classeMention.split(' ');
    const classe = split[0];
    const mention = split[1];

    const formValue ={
      classe: classe,
      mention: mention ,
      date: date,
      heure: horaire,
      matiere: matiere,
      prof : prof,
      codehoraire : codehoraire,
      purpose: "show"
    };

    navigate("/fiche", {
      state: formValue,
    });

  };
  return (
    <div className="tab">
        <div>
            <h1>Liste des fiches de présences</h1>
        </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Horaire</th>
            <th>Enseignant</th>
            <th>Matière</th>
            <th>Classe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((ligne, index) => (
            <tr key={index} data={data}>
              <td className='date'>{ligne.dateabs}</td>
              <td className='horaire'>{ligne.heure}</td>
              <td className='prof'>{ligne.nomens}</td>
              <td className='matiere'>{ligne.matiere}
              </td>
              <td className='classe'>{ligne.classe}</td>
              <td><button className='action' onClick={handleSubmit} id={ligne.codehoraire} >Aperçu</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TabListeFiche