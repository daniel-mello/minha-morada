import { useState } from "react";
import { Card } from "../../../Card";
import { Input } from "../../../Input";
import { Button } from "../../../Button";
import "../../styles.css";

export const Search = ({ assemblies }) => {
  const handleActiveCard = (index) => {
    const getCard = document.getElementById(`card-assembly-${index}`);
    getCard.classList.toggle("isActive")
    
    // usar o handleSelectAssembly
  };

  const isActive = "";

  return (
    <div className="content content--flex-column">
      <h2 className="content__title">Consultar Assembléias</h2>
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
          <span style={{marginRight: 110}}>Assembléia:</span>
          <span>Data:</span>
          <span>Status:</span>
        </div>

        {assemblies.map((assembly, index) => (
          <Card key={`room-schedule-${index}`} className={`card-assembly-${index} ${isActive}`}>
            <span className="card__name">{assembly.titulo}</span>
            <span className="card__name">{assembly.dataHora}</span>
            <Button className="button--fit-content" onClick={() => window.open(assembly.ata)}>Ver Ata</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}