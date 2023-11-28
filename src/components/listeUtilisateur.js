import React, { useState, useEffect } from "react";
import Layout from "./layout";
import "../style/listeUtilisateur.css";
import plus from "../assets/plus.png";
import TabUtilisateur from "./tabUtilisateur";
import ModalAddUtilisateur from "./modal/modalAddUtilisateur";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ListeUtilisateur() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  function handleOpenModal() {
    setOpenModal(true);
  }
  function closeModal() {
    setOpenModal(false);
    //window.location.reload();
  }

  useEffect(() => {
    console.log(localStorage.getItem("poste"))
    if (localStorage.getItem("poste") !== "Admin" || !localStorage.getItem("login")) {
      console.log("ato")
      localStorage.removeItem("poste");
      localStorage.removeItem("matricule");
      localStorage.removeItem("create");
      localStorage.removeItem("login");
      localStorage.removeItem("admin");
      navigate("/");
    }
  }, []);

  return (
    <Layout>
      <div className="section-listeUtilisateur">
        <div className="card-container-user">
          <div className="card-content-header">
            <div className="card-title-user">
              <p>Mes Utilisateurs </p>
            </div>
            <div className="card-addBtn-user">
              <button className="btn-add-user">
                <img
                  src={plus}
                  className="img-add"
                  width="20px"
                  height="20px"
                  onClick={handleOpenModal}
                ></img>
              </button>
            </div>
          </div>
          <div className="card-content-body">
            <TabUtilisateur></TabUtilisateur>
          </div>
        </div>
        {openModal && (
          <ModalAddUtilisateur
            openModal={openModal}
            closeModal={closeModal}
          ></ModalAddUtilisateur>
        )}
      </div>
    </Layout>
  );
}

export default ListeUtilisateur;
