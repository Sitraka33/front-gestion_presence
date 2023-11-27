import React from "react";
import "../style/layout.css";
import { ToastContainer, toast } from "react-toastify";
import Logout from "../assets/Logout.png";
import logo from "../assets/Logo.jpg";
import creer from "../assets/creer.png";
import liste from "../assets/liste.png";
import { NavLink, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const compte = localStorage.getItem("poste");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("poste");
    localStorage.removeItem("matricule");
    localStorage.removeItem("create");
    localStorage.removeItem("login");

    navigate('/');
  };
  return (
    <div className="layout">
      <ToastContainer />
      <header>
        <span>
          <img src={logo} width="79px" height="79px" alt="logo eni" />
        </span>
      </header>
      <aside>
        <div className="navbar">
          <ul>
            {compte === "prof" && (
              <li>
                <NavLink
                  to="/createFp"
                  className={({ isActive }) => (isActive ? "active" : "none")}
                >
                  <img src={creer} width="20px" height="20px" alt="" />
                  Créer fiche
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/listeFiche"
                className={({ isActive }) => (isActive ? "active" : "none")}
              >
                <img src={liste} width="20px" height="20px" alt="" />
                {compte === "prof" ? (
                  <span>Mes fiches</span>
                ) : (
                  <span>Liste des fiches</span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logout">
          <div>
            <img src={Logout} width="20px" height="20px" alt="" />
            <span>
              <button className="logout_btn " onClick={handleLogout}>Se deconnecter</button>
            </span>
          </div>
        </div>
      </aside>
      <section>{children}</section>
      <footer>
        <div>
          <img src={logo} width="40px" height="40px" alt="logo" />
        </div>
        <div>
          <h4>A propos</h4>
          <p>
            Application web permettant de gérer et de suivre les absences des
            étudiants
          </p>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>+264 34 05 533 36 / +261 32 15 204 28</li>
            <li>scolarité@eni.mg</li>
          </ul>
        </div>
        <div>
          <h4>Localisation</h4>
          <p>Tanambao Fianarantsoa</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
