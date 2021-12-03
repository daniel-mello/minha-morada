import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Add } from "./add";
import { Search } from "./search";
import { Edit } from "./edit";
import { Delete } from "./delete";

import AssemblyService from "../../../services/AssemblyService";

export const Assembly = ({ tabActive, toggleModal }) => {
  const [assembly, setAssembly] = useState({});
  const [assemblies, setAssemblies] = useState([]);
  const [searchTerm, setSearchTerm] = useState({});
  const [createData, setCreateData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [editData, setEditData] = useState({});

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
    const nameResults = assemblies.filter(assembly => assembly.titulo === searchTerm.titulo);
    const dateResults = assemblies.filter(assembly => assembly.dataHora === searchTerm.data);
    const resultsComp = [...nameResults, ...dateResults];

    let final = uniq(resultsComp);

    if(final.length === 0) {
      toast.warning("Assembléia não encontrada", {
        position: toast.POSITION.TOP_CENTER
      })
    }

    setSearchResult(final);
  };

  function uniq(a) {
    return Array.from(new Set(a));
  }

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
      assembleia: editData
    };

    AssemblyService.editAssembly(id, body).then(response => {
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
          getAssemblies={getAssemblies}
          setSearchResult={setSearchResult}
          handleSearchAssembly={handleSearchAssembly}
        />}
      {tabActive === "add" && 
        <Add 
          createData={createData}
          setCreateData={setCreateData}
          createAssembly={createAssembly}
        />}
      {tabActive === "edit" && 
        <Edit 
          assemblies={assemblies}
          setEditData={setEditData}
          editData={editData}
          searchTerm={searchTerm}
          toggleModal={toggleModal}
          editAssembly={editAssembly}
          searchResult={searchResult}
          setSearchTerm={setSearchTerm}
          handleSearchAssembly={handleSearchAssembly}
      />}
      {tabActive === "delete" && <Delete assemblies={assemblies} />}
    </div>
  );
}