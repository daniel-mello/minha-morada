import React from "react";
import "./styles.css";

export const Modal = ({ toggleModal, modalContent }) => {
  console.log("daeeee sou a modal")
  console.log(modalContent)

  return (
    <div className="modal">
      <div className="modal__background" onClick={() => toggleModal()} />
      <div className="modal__card">
        <header className="modal__header">
          <div>
            <span className="modal__title">Ata da Assembléia</span>
          </div>
        </header>
        <section className="modal__body">
          <p className="modal__text">
            {modalContent}
          </p>
        </section>
        <footer className="modal__footer">
          <button link outline onClick={() => toggleModal()}>
            FECHAR
          </button>
        </footer>
      </div>
    </div>
  );
};
