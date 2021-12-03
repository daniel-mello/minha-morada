import React from "react";
import { Button } from "../Button";
import "./styles.css";

export const ModalEdit = ({ toggleModal, modalContent }) => {
  return (
    <div className="modal">
      <div className="modal__background" onClick={() => toggleModal(null, true)} />
      <div className="modal__card">
        <header className="modal__header">
          <div>
            <span className="modal__title">Ata da Assembléia</span>
          </div>
        </header>
        <section className="modal__body">
          <textarea             
            // value={createData.ata}
            // className="content__textarea"
            // onChange={e => setCreateData({ ...createData, ata: e.target.value })}
          >
            {modalContent}
          </textarea>
        </section>
        <footer className="modal__footer">
          <Button className="button--card button--fit-content" link outline onClick={() => toggleModal(null, true)}>
            FECHAR
          </Button>
        </footer>
      </div>
    </div>
  );
};
