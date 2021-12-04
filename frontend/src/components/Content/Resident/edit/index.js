import { useEffect, useState } from "react";
import { Input } from "../../../Input";
import { Select } from "../../../Select";
import { Button } from "../../../Button";

export const Edit = ({ 
  editData,
  numbersApt,
  setEditData,
  editResident,
  searchResult,
  selectBlocks,
  initialEditState,
  handleSelectApartment 
}) => {
  const [residentId, setResidentId] = useState(null);

  useEffect(() => {
    if(searchResult.length > 0) {
      setResidentId(searchResult[0].id);
      setEditData({
        nome: searchResult[0].nome,
        email: searchResult[0].email,
        telefone: searchResult[0].telefone,
        dataNascimento: searchResult[0].dataNascimento
      });
    } else {
      setResidentId(null);
      setEditData(initialEditState);
    }
  }, [searchResult])

  return (
    <form onSubmit={e => editResident(e, residentId)} className="form">
      <div className="content__half">
        <h2 className="content__title">Editar Condômino</h2>
        {/* <div className="content__item">
          <span>Selecione o bloco (se houver):</span>
          <Select 
            name="block"
            options={selectBlocks}
          />
        </div> */}

        <div className="content__item">
          <span>Busque pelo apartamento:</span>
          <Select 
            name="apartment"
            options={numbersApt}
            onChange={e => handleSelectApartment(e.target.value)}
          />
        </div>
      </div>

      <div className="content__half">
        <Input 
          name="name"
          required={true}
          value={editData.nome}
          className="input--small"
          label="Nome do Condômino"
          onChange={e => setEditData({ ...editData, nome: e.target.value })}
        />
        <Input 
          name="email"
          label="E-mail"
          required={true}
          value={editData.email}
          className="input--small"
          onChange={e => setEditData({ ...editData, email: e.target.value })}
        />
        <Input 
          name="phone"
          required={true}
          label="Telefone"
          className="input--small"
          value={editData.telefone}
          onChange={e => setEditData({ ...editData, telefone: e.target.value })}
        />
        <Input 
          name="name"
          type="date"
          isDate={true}
          required={true}
          className="input--small"
          label="Data de Nascimento"
          value={editData.dataNascimento}
          onChange={e => setEditData({ ...editData, dataNascimento: e.target.value })}
        />
        <Button className="button--fit-content">Salvar alterações</Button>
      </div>
    </form>
  )
}