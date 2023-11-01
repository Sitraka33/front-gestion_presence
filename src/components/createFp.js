import React from "react";
import Layout from "./layout";
import '../style/createFp.css'

function CreateFp() {
  return (
    <Layout>
      <div className="section-createFp">
        <form className="card-createFp">
          <div className="card-content-createFp">
            <div className="card-title-createFp">
              <h1>CREER UNE FICHE DE PRESENCE</h1>
            </div>
            <div className="card-text-createFp">
              <div className="form_1">
                <div>
                  <label>Classe :</label>
                  <select name="classe" id=""></select>
                </div>
                <div>
                  <label>Mention :</label>
                  <select name="Mention" id=""></select>
                </div>
              </div>
              <div>
                <label>Date:</label>
                <input type="date" />
              </div>
              <div>
                <label>Heure :</label>
                <input type="time" />
              </div>
              <div>
                <label>Matiere :</label>
                <select name="" id=""></select>
              </div>
            </div>
            <div className="card-footer-createFp">
               <button>Générer</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateFp;
