import { useState } from "react";
import moment from "moment";

import { Card } from "../../../Card";
import { Input } from "../../../Input";
import { Button } from "../../../Button";
import "../../styles.css";

export const Delete = ({ assemblies, toggleModal, deleteAssembly }) => {
  const [active, setActive] = useState("");
  const [selected, setSelected] = useState({});

  return (
    <div className="content content--flex-column">
      <h2 className="content__title">Excluir Assembléias</h2>

      <div className="content__bottom">
        <div className="content__header">
          <span style={{marginRight: 110}}>Assembléia:</span>
          <span>Data:</span>
          <span>Status:</span>
        </div>

        {assemblies.map((assembly, index) => {
          const isActive = active === index;
          const date = moment(assembly.dataHora).format("DD/MM/YYYY");

          return (
            <Card key={`room-schedule-${index}`} className={`card--pointer ${isActive ? "card--selected" : ""}`} onClick={() => (setActive(index), setSelected(assembly))}>
              <span className="card__name list__name">{assembly.titulo}</span>
              <span className="card__name list__date">{date}</span>
              <Button className={`button--card button--fit-content ${isActive ? "button--yellow" : ""}`} onClick={() => toggleModal(assembly.ata)}>Ver Ata</Button>
            </Card>
          )
        })}
        <Button className="button--red" onClick={() => deleteAssembly(selected.id)}>Excluir Assembléia</Button>
      </div>
    </div>
  )
}