import { useEffect, useState } from "react";

import { Input } from "../../../Input";
import { Card } from "../../../Card";
import { Button } from "../../../Button";

export const Edit = ({ rooms, editRoom, editData, setEditData, }) => {
  const [active, setActive] = useState("");
  const [selectedRoom, setSelectedRoom] = useState({});

  useEffect(() => {
    setEditData(selectedRoom.nomeEspaco);
  }, [selectedRoom])

  return (
    <form onSubmit={e => (editRoom(e, selectedRoom.id), setActive(""))} className="form">
      <div className="content__half">
        <h2 className="content__title">Editar Espaço</h2>
          {rooms.map((item, index) => {
            const isActive = active === index;

            return (
              <div className="is-pointer" onClick={() => (setActive(index), setSelectedRoom(item))}>
                <Card key={`room-${index}`} className="card__name">
                  {isActive ? (
                    <Input 
                      name="room"
                      value={editData}
                      className="input--edit"
                      onChange={e => setEditData(e.target.value)}
                    />
                  ) : (
                    <span>{item.nomeEspaco}</span>
                  )}
                </Card>
                {isActive && <Button type="submit" className="button--fit-content">Salvar alterações</Button>}
              </div>
            )
          })}
      </div>
    </form>
  )
}