import React from "react";
import { Button } from "../Button";
import "./styles.css";

export const Modal = ({ toggleModal, modalContent }) => {
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
          <Button className="button--card button--fit-content" link outline onClick={() => toggleModal()}>
            FECHAR
          </Button>
        </footer>
      </div>
    </div>
  );
};
