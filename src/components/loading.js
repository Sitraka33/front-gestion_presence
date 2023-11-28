import React from "react";
import "../style/loading.css";

function Loading({ type, wait }) {
  return (
    <div className="container-loading">
      <div className="loading">
        <div className="loading-icon">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="loading-text">

          {type === "login" ? (
            <p>Recuperation des informations du compte....</p>
          ) : wait === true ? (
            <p>Traitement...</p>
          ) : (
            <p>Chargement de la liste des {type}....</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Loading;
