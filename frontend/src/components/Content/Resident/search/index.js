import { useEffect } from "react";
import moment from "moment";

import { Input } from "../../../Input";
import { Select } from "../../../Select";
import { Button } from "../../../Button";
import { Card } from "../../../Card";
import { PersonCard } from "../../../PersonCard";
import "../styles.css";

export const Search = ({ 
  numbersApt, 
  searchTerm,
  selectBlocks,
  getResidents,
  searchResult,
  setSearchTerm,
  handleSearchResident,
  handleSelectApartment
}) => {
  const hasSearched = searchResult.length > 0;

  useEffect(() => {
    getResidents();
  }, []);

  return (
    <>
      <div className="content__half">
        <h2 className="content__title">Consultar Condômino</h2>

        <Input 
          name="name"
          className="input--small"
          label="Nome do Condômino"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {/* <div className="content__item">
          <span>Selecione o bloco (se houver):</span>
          <Select 
            name="block"
            options={selectBlocks}
          />
        </div> */}

        <div className="content__item">
          <span>Selecione o apartamento:</span>
          <Select 
            name="apartment"
            options={numbersApt}
            onChange={e => handleSelectApartment(e.target.value)}
          />
        </div>

        <Button className="button--fit-content" onClick={handleSearchResident}>Pesquisar</Button>
      </div>

      <div className="content__half">
        {hasSearched ? (
          <>
            {searchResult.map((person, index) => {
              const birthday = moment(person.dataNascimento).format("DD/MM/YYYY");
              return (
                <PersonCard
                  cpf={person.cpf}
                  name={person.nome}
                  person="personOne"
                  email={person.email}
                  key={`person-${index}`}
                  phone={person.telefone}
                  birthday={birthday}
                />
              )
            })}
          </>
        ) : (
          <Card>Apartamento vazio</Card>
        )}
      </div>
    </>
  )
}