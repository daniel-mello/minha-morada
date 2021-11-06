import { Input } from "../../../Input";
import { Card } from "../../../Card";
import { Button } from "../../../Button";
import "../styles.css";

export const Search = ({ rooms, searchTerm, searchResult, setSearchTerm, handleSearchRoom }) => {
  const hasSearched = searchResult.length > 0;

  return (
    <>
      <div className="content__half">
        <h2 className="content__title">Consultar Espaço</h2>

        <Input 
          name="room"
          value={searchTerm}
          className="input--small"
          label="Digite o nome do Espaço"
          onChange={e => setSearchTerm(e.target.value)}
        />

        <Button className="button--fit-content" onClick={handleSearchRoom}>Pesquisar</Button>
      </div>

      <div className="content__half">
        <span>Resultado:</span>
        {hasSearched ? (
          <>
            {searchResult.map((item, index) => (
              <Card key={`room-${index}`} className="card__name">{item.nomeEspaco}</Card>
            ))}
          </>
        ) : (
          <>
            {rooms.map((item, index) => (
              <Card key={`room-${index}`} className="card__name">{item.nomeEspaco}</Card>
            ))}
          </>
        )}
      </div>
    </>
  )
}