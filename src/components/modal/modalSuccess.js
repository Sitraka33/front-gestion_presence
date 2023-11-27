import React from 'react'
import "../../style/modalSuccess.css"

function ModalSuccess({openModal,closeModal,children}) {
    console.log("etat :" +openModal);
  return (
    openModal && (
        <div className="modalSuccess_background" onClick={closeModal}>
          <div className="modalSuccess_container">
              {children}
          </div>
        </div>
        
      )
  )
}

export default ModalSuccess