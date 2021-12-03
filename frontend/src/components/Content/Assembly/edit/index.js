import { useEffect, useState } from "react";
import moment from "moment";

import { Input } from "../../../Input";
import { Button } from "../../../Button";
import { Card } from "../../../Card";

export const Edit = ({ assemblies, editAssembly, editData, setEditData, toggleModal }) => {
  const [active, setActive] = useState("");
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setEditData(selected);
  }, [selected])

  console.log({editData})

  return (
    <form onSubmit={e => (editAssembly(e, selected.id), setActive(""))} className="form">
      <div className="content content--flex-column">
        <h2 className="content__title">Editar Assembléias</h2>
        <div className="content__top">
          <div className="content__item content__item--no-margin">
            <Input
              name="type"
              label="Digite um tipo de assembléia"
              className="input--small"
            />
          </div>
          <div className="content__date">
            <Input
              name="date"
              type="date"
              isDate={true}
              label="Selecione uma data"
            />
          </div>
        </div>

        <div className="content__bottom">
          <div className="content__header">
            <span className="content__header--name">Assembléia:</span>
            <span className="content__header--date">Data:</span>
            <span>Status:</span>
          </div>

          {assemblies.map((assembly, index) => {
            const isActive = active === index;
            const date = moment(assembly.dataHora).format("DD/MM/YYYY");

            return (
              <Card key={`room-schedule-${index}`} className="card--pointer" onClick={() => (setActive(index), setSelected(assembly))}>
                {isActive ? (
                  <>
                    <Input
                      name="type"
                      type="type"
                      label={assembly.titulo}
                      value={editData.titulo}
                      onChange={e => setEditData({...editData, titulo: e.target.value})}
                    />
                    <Input
                      name="date"
                      type="date"
                      isDate={true}
                      label={date}
                      value={editData.dataHora}
                      onChange={e => setEditData({...editData, dataHora: e.target.value})}
                    />
                  </>
                ) : (
                  <>
                    <span className="card__name list__name">{assembly.titulo}</span>
                    <span className="card__name list__date">{date}</span>
                  </>
                )}
                <Button 
                  type="button"
                  className="button--card button--fit-content"
                  onClick={e => (e.preventDefault, toggleModal(assembly.ata, true))}
                >
                  Abrir Ata
                </Button>
              </Card>
            )
          })}
        </div>

        <Button type="submit" className="button--fit-content">Editar</Button>
      </div>
    </form>
  )
}