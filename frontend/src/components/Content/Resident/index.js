import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Add } from "./add";
import { Search } from "./search";
import { Edit } from "./edit";
import { Delete } from "./delete";

import ApartmentService from "../../../services/ApartmentService";
import ResidentService from "../../../services/ResidentService";

const selectBlocks = ["Não há blocos"];

const initialEditState = {
  nome: "",
  email: "",
  telefone: "",
  dataNascimento: ""
};

export const Resident = ({ tabActive }) => {
  const [residents, setResidents] = useState([]);
  const [apartment, setApartment] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [numbersApt, setNumbersApt] = useState([]);
  const [createData, setCreateData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [editData, setEditData] = useState(initialEditState);

  useEffect(() => {
    getApartments();
  }, []);

  useEffect(() => {
    setApartment({});
    getApartments();
    setSearchResult([]);
    setCreateData({});
  }, [tabActive]);

  useEffect(() => {
    const aptResident = apartment && apartment.morador !== undefined;
    setSearchResult(aptResident ? [apartment.morador] : []);
  }, [apartment]);

  // HANDLERS
  // _____________
  const handleSelectApartment = id => {
    if (id) {
      const selectApt = apartments.find(it => it.numeroApto === id);
  
      getApartment(selectApt.id);
    }
  };
  
  const handleSearchResident = e => {
    const results = residents.filter(person => person.nome.includes(searchTerm));
    if(results.length === 0) {
      toast.warning("Condômino não encontrado", {
        position: toast.POSITION.TOP_CENTER
      })
    }

    setSearchResult(results);
  };

  const handleDeleteSearchResident = e => {
    const results = residents.find(person => person.nome.includes(searchTerm));

    if(results === undefined ||(results && results.length === 0)) {
      return toast.warning("Condômino não encontrado", {
        position: toast.POSITION.TOP_CENTER
      })
    }

    setSearchResult([results]);
  };

  // HTTP METHODS
  // __________________
  const getApartments = () => {
    ApartmentService.getApartments().then(response => {
      const data = response.data.listaApartamentos;
      const numberApt = data.map(apt => apt.numeroApto);

      setApartments(data);
      setNumbersApt(numberApt);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const getApartment = id => {
    ApartmentService.getApartment(id).then(response => {
      const apt = response.data.apartamento;
      setApartment(apt);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const getResidents = () => {
    ResidentService.getResidents().then(response => {
      const data = response.data.listaMoradores;

      setResidents(data);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const createResident = e => {
    e.preventDefault();

    const body = {
      "morador": {
        ...createData,
        "apartamento": {
          "id": apartment.id
        }
      }
    };

    ResidentService.createResident(body).then(response => {
      toast.success(response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER
      });
      return setResidents([ ...residents, createData ]);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const editResident = (e, id) => {
    e.preventDefault();

    if (!id) {
      return toast.error("ID inválido! Selecione um morador e tente novamente.", {
        position: toast.POSITION.TOP_CENTER
      });
    };

    const body = {
      "morador": {
        ...editData,
        "apartamento": {
          "id": apartment.id
        }
      }
    }

    ResidentService.editResident(id, body).then(response => {
      toast.success(response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER
      });
      return setResidents([ ...residents, editData ]);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const deleteResident = id => {
    if (!id) {
      return toast.error("ID inválido! Selecione um morador e tente novamente.", {
        position: toast.POSITION.TOP_CENTER
      });
    };

    if (id === 1) {
      return toast.error("O usuário modelo não pode ser deletado. Favor escolher outro usuário.", {
        position: toast.POSITION.TOP_CENTER
      });
    }

    ResidentService.deleteResident(id).then(response => {
      toast.success(response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER
      });
      getResidents();
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  }

  return (
    <div className="content">
      {tabActive === "search" && 
        <Search
          numbersApt={numbersApt}
          searchTerm={searchTerm}
          selectBlocks={selectBlocks}
          getResidents={getResidents}
          searchResult={searchResult}
          setSearchTerm={setSearchTerm}
          handleSearchResident={handleSearchResident}
          handleSelectApartment={handleSelectApartment}
        />
      }
      {tabActive === "add" && 
        <Add
          createData={createData}
          numbersApt={numbersApt}
          apartments={apartments}
          selectBlocks={selectBlocks}
          setCreateData={setCreateData}
          createResident={createResident}
          handleSelectApartment={handleSelectApartment}
        />
      }
      {tabActive === "edit" && 
        <Edit
          editData={editData}
          numbersApt={numbersApt}
          setEditData={setEditData}
          apartment={apartment}
          editResident={editResident}
          selectBlocks={selectBlocks}
          searchResult={searchResult}
          initialEditState={initialEditState}
          handleSelectApartment={handleSelectApartment}
        />
      }
      {tabActive === "delete" && 
        <Delete
          residents={residents}
          numbersApt={numbersApt}
          searchTerm={searchTerm}
          selectBlocks={selectBlocks}
          getResidents={getResidents}
          searchResult={searchResult}
          setSearchTerm={setSearchTerm}
          deleteResident={deleteResident}
          handleSelectApartment={handleSelectApartment}
          handleDeleteSearchResident={handleDeleteSearchResident}
        />
      }
    </div>
  );
}