import React, { useState } from "react";
import Layout from "./layout";
import "../style/createFp.css";
import { Link, useNavigate } from "react-router-dom";

function CreateFp() {
  const [formValue, setFormValue] = useState({
    classe: "",
    mention: "",
    date: "",
    heure: "",
    matiere: "",
  });

  const navigate = useNavigate();

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setFormValue({ ...formValue, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    navigate('/fiche', {
      state : formValue
    })
    console.log(formValue);
  }
  return (
    <Layout>
      <div className="section-createFp">
        <form className="card-createFp" onSubmit={handleSubmit}>
          <div className="card-content-createFp">
            <div className="card-title-createFp">
              <h1>CREER UNE FICHE DE PRESENCE</h1>
            </div>
            <div className="card-text-createFp">
              <div className="form_1">
                <div>
                  <label>Classe :</label>
                  <select
                    name="classe"
                    value={formValue.classe}
                    onChange={handleInputChange}
                    id=""
                  >
                    <option value="">Choisir classe</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                  </select>
                </div>
                <div>
                  <label>Mention :</label>
                  <select
                    name="mention"
                    value={formValue.mention}
                    onChange={handleInputChange}
                    id=""
                  >
                    <option value="">Choisir mention</option>
                    <option value="GB">GB</option>
                    <option value="SR">SR</option>
                    <option value="IG">IG</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formValue.date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Heure :</label>
                <input
                  type="time"
                  name="heure"
                  value={formValue.time}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Matiere :</label>
                <select
                  name="matiere"
                  value={formValue.matiere}
                  onChange={handleInputChange}
                  id=""
                >
                  <option value="">Choisir matière</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                </select>
              </div>
            </div>
            <div className="card-footer-createFp">
              {/* <Link
                to={`/fiche?classe=${formValue.classe}&mention=${formValue.mention}&date=${formValue.date}&heure=${formValue.heure}&matiere=${formValue.matiere}`}
              >
                <button>Générer</button>
              </Link> */}
              <button>Générer</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateFp;
