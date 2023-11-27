import React, { useState ,useEffect} from "react";
import "../../style/modalProgressBar.css";

function ModalProgressBar({ openModal, children, closeModal,downloadComplete }) {
  console.log("etat :" +downloadComplete);
  return (
    openModal && (
      <div className="modal_background" onClick={closeModal}>
        <div className="modal_container">
            {children}
        </div>
      </div>
      
    )
  );
}

export default ModalProgressBar;
