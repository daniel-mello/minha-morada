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
    "nomeEspaco": {
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


  return (
    <div className="content">
      {tabActive === "search" && 
        <Search 
          room={room}
          getRooms={getRooms}
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
          // editData={editData}
          // apartment={apartment}
          // numbersApt={numbersApt}
          // setEditData={setEditData}
          // selectBlocks={selectBlocks}
          // editApartment={editApartment}
          // handleSelectApartment={handleSelectApartment}
        />}
      {tabActive === "delete" && 
        <Delete 
          // apartment={apartment}
          // numbersApt={numbersApt}
          // selectBlocks={selectBlocks}
          // deleteApartment={deleteApartment}
          // handleSelectApartment={handleSelectApartment}
        />}
    </div>
  );
}