import React from "react";
import "../style/layout.css";
import Logout from '../assets/Logout.png'
import logo from "../assets/Logo.jpg";

function Layout({children}) {
  return (
    <div className="layout">
      <header>
        <span>
          <img src={logo} width="79px" height="79px" alt="logo eni" />
        </span>
      </header>
      <aside>
        <div>
          <span>
            <div>
              <img src={Logout} width="20px" height="20px" alt="" />
              <span>Se deconnecter</span>
            </div>
          </span>
        </div>
      </aside>
      <section>
        {children}
      </section>
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
