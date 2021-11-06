import { Input } from "../../../Input";
import { Button } from "../../../Button";

export const Add = ({ createData, setCreateData, createRoom }) => {
  return (
    <form onSubmit={createRoom} className="form">
      <div className="content__half">
        <h2 className="content__title">Cadastrar Espaço</h2>
        <Input 
          name="room"
          className="input--small"
          label="Digite o nome do Espaço"
          value={createData.nomeEspaco}
          onChange={e => setCreateData({ ...createData, nomeEspaco: e.target.value })}
        />
        
        <Button className="button--fit-content">Cadastrar</Button>
      </div>
    </form>
  )
}