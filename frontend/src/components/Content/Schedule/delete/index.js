import { useState } from "react";

import { Button } from "../../../Button";
import { Card } from "../../../Card";
import "../../styles.css";

export const Delete = ({ rooms, deleteSchedule }) => {

  return (
    <div className="content content--flex-column">
      <h2 className="content__title">Cancelar Agendamentos</h2>

      <div className="content__bottom">
        <div className="content__header">
          <span className="content__header--name">Espaço:</span>
          <span className="content__header--date">Data:</span>
          <span>Status:</span>
        </div>

        {rooms.map((room, index) => {
          const notAvailable = room && room.agendamentoEspaco.length > 0;
          const agendamento = notAvailable && room.agendamentoEspaco[0];

          return (
            <Card key={`room-schedule-${index}`}>
              <span className="card__name list__name">{room.nomeEspaco}</span>
              <span className="card__name list__date">{agendamento.dataHoraAgendamento}</span>
              <Button 
                onClick={e => notAvailable ? deleteSchedule(room.id) : null}
                className={`button button--fit-content button--card ${notAvailable ? "occupied" : "available"}`}
              >
                {notAvailable ? "Cancelar" : "Espaço Livre"}
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}