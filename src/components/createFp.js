import React, { useEffect, useState } from "react";
import Layout from "./layout";
import Axios from "axios";
import "../style/createFp.css";
import { useNavigate } from "react-router-dom";
import { data, event } from "jquery";

function CreateFp() {
  const [dataMatiere, setDataMatiere] = useState([]);
  const [matiere, setMatiere] = useState([{}]);
  const [dataMention, setDataMention] = useState([]);
  const codeens = "ENI00387";
  var newMatiere_1;
  const [formValue, setFormValue] = useState({
    classe: "",
    mention: "",
    date: "",
    heure: "",
    matiere: "",
  });
  const classe = [
    { nom: "L1" },
    { nom: "L2" },
    { nom: "L3" },
    { nom: "M1" },
    { nom: "M2" },
  ];

  const mention_1 = [{ nom: "PRO" }, { nom: "IG" }];
  const mention_2 = [{ nom: "IG" }, { nom: "GB" }, { nom: "SR" }];
  const navigate = useNavigate();

  const getMatiere = async () => {
    try {
      const response = await Axios.get(
        "https://eni-service-gestionpresence.onrender.com/matiere/" + codeens
      );
      setDataMatiere(response.data);
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setFormValue({ ...formValue, [name]: value });
  }

  function handleClasseChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });

    if (value === "L1") setDataMention(mention_1);
    else setDataMention(mention_2);
  }

  const setMatiereChange = (event) => {
    const newMatiere = dataMatiere.filter(
      (item) => item.classe === formValue.classe + " " + formValue.mention
    );

    setMatiere((matiere) => newMatiere);
  }

  const handleMentionChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    navigate("/fiche", {
      state: formValue,
    });
    console.log(formValue);
  }

  useEffect(() => {
    getMatiere();
  }, []);

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
                    onChange={handleClasseChange}
                    id=""
                    required
                  >
                    <option value="">Choisir classe</option>
                    {classe.map((ligne, index) => (
                      <option key={index} value={ligne.nom}>
                        {ligne.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Mention :</label>
                  <select
                    name="mention"
                    value={formValue.mention}
                    onChange={handleMentionChange}
                    id=""
                    required
                  >
                    <option value="">Choisir mention</option>
                    {dataMention.map((ligne, index) => (
                      <option key={index} value={ligne.nom}>
                        {ligne.nom}
                      </option>
                    ))}
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
                  required
                />
              </div>
              <div>
                <label>Heure :</label>
                <input
                  type="time"
                  name="heure"
                  value={formValue.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Matiere :</label>
                <select
                  name="matiere"
                  value={formValue.matiere}
                  onChange={handleInputChange}
                  onClick={setMatiereChange}
                  id=""
                  required
                >
                  <option value="">Choisir matière</option>
                  {matiere.map((ligne, index) => (
                    <option key={index} value={ligne.matiere}>
                      {ligne.matiere}
                    </option>
                  ))}
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
