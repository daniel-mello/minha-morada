import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Add } from "./add";
import { Search } from "./search";
import { Edit } from "./edit";
import { Delete } from "./delete";

import AssemblyService from "../../../services/AssemblyService";

const assemblies = [
  {
    type: "Assembléia Extraordinária",
    date: "22/07/2020",
  },
  {
    type: "Assembléia Geral Ordinária",
    date: "20/06/2020",
  },
  {
    type: "Assembléia Extraordinária",
    date: "19/05/2020",
  },
]

export const Assembly = ({ tabActive, toggleModal }) => {
  const [assembly, setAssembly] = useState({});
  const [assemblies, setAssemblies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createData, setCreateData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    getAssemblies();
  }, []);

  
  // HANDLERS
  // _____________
  const handleSelectAssembly = id => {
    const selectAssembly = assemblies.find(it => it.numeroApto === id);

    // getAssembly(selectApt.id);
  };

  const handleSearchAssembly = () => {
    const results = assemblies.filter(assembly => assembly.nomeEspaco.includes(searchTerm));
    if(results.length === 0) {
      toast.warning("Espaço não encontrado", {
        position: toast.POSITION.TOP_CENTER
      })
    }

    setSearchResult(results);
  };

  // HTTP METHODS
  // __________________
  const getAssemblies = () => {
    AssemblyService.getAssemblies().then(response => {
      const data = response.data.listaAssembleias;
      setAssemblies(data);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const createAssembly = (e) => {
    e.preventDefault();

    const body = {
      "assembleia": {
        ...createData
      }
    }

    console.log(body)

    AssemblyService.createAssembly(body).then(response => {
      toast.success("Assembléia registrada com sucesso!", {
        position: toast.POSITION.TOP_CENTER
      });
      setCreateData("");
      return setAssemblies([ ...assemblies, createData ]);
    }).catch(e => (
      toast.error("Erro: Tente novamente ou entre em contato conosco.", {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const editAssembly = (e, id) => {
    e.preventDefault();

    const body = {
      assembleia: {
        editData
      }
    };

    console.log("body no editAssembly: ", body);

    AssemblyService.editAssembly(id, body).then(response => {
      console.log(response)
      toast.success("Assembléia editada com sucesso!", {
        position: toast.POSITION.TOP_CENTER
      });
      return getAssemblies();
    }).catch(e => (
      toast.error("Erro: Tente novamente ou entre em contato conosco.", {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const deleteAssembly = id => {
    console.log("id do delete: ", id)
    AssemblyService.deleteAssembly(id).then(response => {
      toast.success(response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER
      });
      return getAssemblies();
    }).catch(e => (
      toast.error("Erro: Tente novamente ou entre em contato conosco.", {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  return (
    <div className="content">
      {tabActive === "search" && 
        <Search 
          assemblies={assemblies}
          searchTerm={searchTerm}
          toggleModal={toggleModal}
          searchResult={searchResult}
          setSearchTerm={setSearchTerm}
          handleSearchAssembly={handleSearchAssembly}
        />}
      {tabActive === "add" && 
        <Add 
          createData={createData}
          assemblies={assemblies}
          setCreateData={setCreateData}
          setAssemblies={setAssemblies}
          createAssembly={createAssembly}
        />}
      {tabActive === "edit" && <Edit assemblies={assemblies} />}
      {tabActive === "delete" && <Delete assemblies={assemblies} />}
    </div>
  );
}