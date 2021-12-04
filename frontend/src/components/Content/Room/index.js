import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Add } from "./add";
import { Search } from "./search";
import { Edit } from "./edit";
import { Delete } from "./delete";

import RoomService from "../../../services/RoomService";

export const Room = ({ tabActive }) => {
  const [room, setRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createData, setCreateData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    setRoom({});
    getRooms();
    setSearchResult([]);
  }, [tabActive]);


// HANDLERS
// _____________
  const handleSearchRoom = () => {
    const results = rooms.filter(room => room.nomeEspaco.includes(searchTerm));
    if(results.length === 0) {
      toast.warning("Espaço não encontrado", {
        position: toast.POSITION.TOP_CENTER
      })
    }

    setSearchResult(results);
  };

  // HTTP METHODS
  // __________________
  const getRooms = () => {
    RoomService.getRooms().then(response => {
      const data = response.data.listaEspacos;
      setRooms(data);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const createRoom = (e) => {
    e.preventDefault();

    const body = {
      "espaco": {
        ...createData
      }
    }

    RoomService.createRoom(body).then(response => {
      toast.success("Espaço criado com sucesso!", {
        position: toast.POSITION.TOP_CENTER
      });
      setCreateData("");
      return setRooms([ ...rooms, createData ]);
    }).catch(e => (
      toast.error("Erro: Tente novamente ou entre em contato conosco.", {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const editRoom = (e, id) => {
    e.preventDefault();

    const body = {
      espaco: {
        nomeEspaco: editData
      }
    };

    RoomService.editRoom(id, body).then(response => {
      toast.success("Espaço editado com sucesso!", {
        position: toast.POSITION.TOP_CENTER
      });
      return getRooms();
    }).catch(e => (
      toast.error("Erro: Tente novamente ou entre em contato conosco.", {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const deleteRoom = id => {
    RoomService.deleteRoom(id).then(response => {
      toast.success(response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER
      });
      getRooms();
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
          rooms={rooms}
          searchTerm={searchTerm}
          searchResult={searchResult}
          setSearchTerm={setSearchTerm}
          handleSearchRoom={handleSearchRoom}
        />}
      {tabActive === "add" && 
        <Add 
          rooms={rooms}
          setRooms={setRooms}
          createRoom={createRoom}
          createData={createData}
          setCreateData={setCreateData}
        />}
      {tabActive === "edit" && 
        <Edit
          room={room}
          rooms={rooms}
          editRoom={editRoom}
          editData={editData}
          setEditData={setEditData}
        />}
      {tabActive === "delete" && 
        <Delete 
          rooms={rooms}
          deleteRoom={deleteRoom}
        />}
    </div>
  );
}