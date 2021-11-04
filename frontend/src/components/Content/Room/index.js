import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Add } from "./add";
import { Search } from "./search";
import { Edit } from "./edit";
import { Delete } from "./delete";

import RoomService from "../../../services/RoomService";

const initialEditState = [

];

export const Room = ({ tabActive }) => {
  const [room, setRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [createData, setCreateData] = useState({});
  const [editData, setEditData] = useState(initialEditState);

  useEffect(() => {
    getRooms();
    console.log({rooms})
  }, []);

  useEffect(() => {
    setRoom({});
    getRooms();
  }, [tabActive]);

  const handleSelectRoom = id => {
    const selectRoom = rooms.find(it => it.numeroApto === id);

    // getRoom(selectApt.id);
  };

// HTTP METHODS
// __________________
const getRooms = () => {
  RoomService.getRooms().then(response => {
    const data = response.data.listaEspacos;
    console.log({data})

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

  console.log(body)

  RoomService.createRoom(body).then(response => {
    toast.success(response.data.mensagem, {
      position: toast.POSITION.TOP_CENTER
    });
    return setRooms([ ...rooms, createData ]);
  }).catch(e => (
    toast.error(e.mensagem, {
      position: toast.POSITION.TOP_CENTER
    })
  ));
};

const editRoom = (e, id) => {
  e.preventDefault();

  const body = {
    "nomeEspaco": {
      ...editData
    }
  }

  RoomService.editRoom(id, body).then(response => {
    toast.success(response.data.mensagem, {
      position: toast.POSITION.TOP_CENTER
    });
    return setRooms([ ...rooms, editData ]);
  }).catch(e => (
    toast.error(e.mensagem, {
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
    toast.error(e.mensagem, {
      position: toast.POSITION.TOP_CENTER
    })
  ));
};

  return (
    <div className="content">
      {tabActive === "search" && 
        <Search 
          room={room}
          rooms={rooms}
          getRooms={getRooms}
          handleSelectRoom={handleSelectRoom}
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
          handleSelectRoom={handleSelectRoom}
        />}
      {tabActive === "delete" && 
        <Delete 
          rooms={rooms}
          deleteRoom={deleteRoom}
          handleSelectRoom={handleSelectRoom}
        />}
    </div>
  );
}