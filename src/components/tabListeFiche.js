import React from 'react'

function TabListeFiche({data}) {
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
              <td className='date'>{ligne.date}</td>
              <td>{ligne.horaire}</td>
              <td>{ligne.prof}</td>
              <td>{ligne.matiere}
              </td>
              <td>{ligne.classe}</td>
              <td><button className='action'>Aperçu</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TabListeFiche