import React from "react";
import "../../style/modalSuccess.css";

function ModalSuccess({ openModal, children }) {
  return (
    openModal && (
      <div className="modalSuccess_background">
        <div className="modalSuccess_container">{children}</div>
      </div>
    )
  );
}

export default ModalSuccess;
