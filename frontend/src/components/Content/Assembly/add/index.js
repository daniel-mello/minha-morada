import { Input } from "../../../Input";
import { Button } from "../../../Button";
import "../../styles.css";

export const Add = ({ createData, setCreateData, createAssembly }) => {
  return (
    <form onSubmit={createAssembly} className="form">
      <div className="content content--flex-column">
        <h2 className="content__title">Cadastrar Assembléias</h2>
        <div className="content__top">
          <div className="content__item content__item--no-margin">
            <Input
              name="type"
              required={true}
              className="input--small"
              value={createData.titulo}
              label="Digite um tipo de assembléia"
              onChange={e => setCreateData({ ...createData, titulo: e.target.value })}
            />
          </div>
          <div className="content__date">
            <Input
              name="date"
              type="date"
              isDate={true}
              required={true}
              label="Selecione uma data"
              value={createData.dataHora}
              onChange={e => setCreateData({ ...createData, dataHora: e.target.value })}
            />
          </div>
        </div>

        <div className="content__bottom">
          <span className="content__header">Ata:</span>
          <textarea 
            rows="10"
            cols="30"
            id="minute"
            name="minute"
            required={true}
            value={createData.ata}
            className="content__textarea"
            onChange={e => setCreateData({ ...createData, ata: e.target.value })}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}> 
            <Button className="button">Cadastrar</Button>
          </div>
        </div>
      </div>
    </form>
  )
}