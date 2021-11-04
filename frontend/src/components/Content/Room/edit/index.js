import { useEffect, useState } from "react";

import { Input } from "../../../Input";
import { Card } from "../../../Card";
import { Button } from "../../../Button";

export const Edit = ({ room, rooms, editRoom, editData, setEditData, }) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    setEditData({
      nomeEspaco: room.nomeEspaco,
    });
  }, [room])

  return (
    <form onSubmit={e => editRoom(e, room.id)} className="form">
      <div className="content__half">
        <h2 className="content__title">Editar Espaço</h2>
          {rooms.map((item, index) => {
            const isActive = active === index;

            return (
              <div className="is-pointer" onClick={() => setActive(index)}>
                <Card key={`room-${index}`} className="card__name">
                  {isActive ? (
                    <Input 
                      name="room"
                      label={item}
                      value={editData}
                      className="input--edit"
                      onChange={e => setEditData({ ...editData, nomeEspaco: e.target.value })}
                    />
                  ) : (
                    <span>{item}</span>
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