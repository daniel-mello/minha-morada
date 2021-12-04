import { useEffect, useState } from "react";
import moment from "moment";

import { Input } from "../../../Input";
import { Button } from "../../../Button";
import { Card } from "../../../Card";

export const Edit = ({ assemblies, searchTerm, searchResult, setSearchTerm, editAssembly, editData, setEditData, handleSearchAssembly }) => {
  const [active, setActive] = useState("");
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setEditData(selected);
    
  }, [selected])

  return (
    <form onSubmit={e => (editAssembly(e, selected.id), setActive(""))} className="form">
      <div className="content content--flex-column">
        <h2 className="content__title">Editar Assembléias</h2>

        <div className="content__bottom">
          <div className="content__header">
            <span className="content__header--name">Assembléia:</span>
            <span className="content__header--date">Data:</span>
          </div>

          {assemblies.map((assembly, index) => {
            const date = moment(assembly.dataHora).format("DD/MM/YYYY");
            const isActive = active === index;

            return (
              <Card key={`room-schedule-${index}`} className={`card-assembly-${index}`} onClick={() => (setActive(index), setSelected(assembly))}>
                {isActive ? (
                  <div className="edit__card">
                    <div className="edit__card--row">
                      <Input 
                        name="type"
                        required={true}
                        value={editData.titulo}
                        className="input--fit-content"
                        onChange={e => setEditData({ ...editData, titulo: e.target.value })}
                      />
                      <Input
                        name="date"
                        type="date"
                        isDate={true}
                        required={true}
                        value={editData.dataHora}
                        className="input--fit-content"
                        onChange={e => setEditData({ ...editData, dataHora: e.target.value })}
                      />
                    </div>
                    <div className="content__bottom">
                      <span className="content__header">Ata:</span>
                      <textarea 
                        rows="10"
                        cols="30"
                        id="minute"
                        name="minute"
                        required={true}
                        value={editData.ata}
                        className="content__textarea edit__textarea"
                        onChange={e => setEditData({ ...editData, ata: e.target.value })}
                      />
                      <Button className="button--fit-content">Salvar Alterações</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="card__name card__name--full-width">{assembly.titulo}</span>
                    <span className="card__name">{date}</span>
                    <div></div>
                  </>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </form>
  )
}