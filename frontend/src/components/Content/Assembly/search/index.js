import { useEffect } from "react";
import moment from "moment";
import { Card } from "../../../Card";
import { Input } from "../../../Input";
import { Button } from "../../../Button";
import "../../styles.css";

export const Search = ({assemblies, searchTerm, getAssemblies, toggleModal, searchResult, setSearchResult, setSearchTerm, handleSearchAssembly }) => {

  useEffect(() => {
    getAssemblies();
    setSearchResult(assemblies);
  }, []);

  return (
    <div className="content content--flex-column">
      <h2 className="content__title">Consultar Assembléias</h2>
      <div className="content__top">
        <div className="content__item content__item--no-margin">
          <Input
            name="type"
            className="input--small"
            value={searchTerm.titulo}
            label="Digite um tipo de assembléia"
            onChange={e => setSearchTerm({ ...searchTerm, titulo: e.target.value })}
          />
        </div>
        <div className="content__date">
          <Input
            name="name"
            type="date"
            isDate={true}
            value={searchTerm.data}
            onChange={e => setSearchTerm({ ...searchTerm, data: e.target.value })}
          />
        </div>
      </div>

      <div className="content__bottom">
        <div className="content__header">
          <span className="content__header--name">Assembléia:</span>
          <span className="content__header--date">Data:</span>
          <span >Status:</span>
        </div>

        {searchResult.map((assembly, index) => {
          const date = moment(assembly.dataHora).format("DD/MM/YYYY");

          return (
            <Card key={`room-schedule-${index}`} className={`card-assembly-${index}`}>
              <span className="card__name list__name">{assembly.titulo}</span>
              <span className="card__name list__date">{date}</span>
              <Button className="button--fit-content button--card" onClick={() => toggleModal(assembly.ata)}>Ver Ata</Button>
            </Card>
          )
        })}
      </div>

      <Button className="button--fit-content" onClick={() => handleSearchAssembly()}>Pesquisar</Button>
    </div>
  )
}