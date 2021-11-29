import { useState } from "react";

import { Button } from "../../../Button";
import { Card } from "../../../Card";
import "../styles.css";

export const Delete = ({ rooms, deleteRoom }) => {
  const [active, setActive] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});

  return (
    <>
      <div className="content__half">
        <h2 className="content__title">Deletar Espaço</h2>
          {rooms.map((item, index) => {
            const isActive = active === index;

            return (
              <div className="is-pointer" onClick={() => (setActive(index), setSelectedRoom(item))}>
                <Card key={`room-${index}`} className={`card__name ${isActive && "card--selected"}`}>
                  {item.nomeEspaco}
                </Card>
                {isActive && 
                  <Button onClick={() => deleteRoom(selectedRoom.id)} className="button button--red">Excluir Espaço</Button>
                }
              </div>
            )
          })}
      </div>
    </>
  )
}