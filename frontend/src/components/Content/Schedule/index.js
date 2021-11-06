import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Add } from "./add";
import { Delete } from "./delete";

import RoomService from "../../../services/RoomService";
import ScheduleService from "../../../services/ScheduleService";

export const Schedule = ({ tabActive }) => {
  const [rooms, setRooms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [createData, setCreateData] = useState({});
  
  useEffect(() => {
    getRooms();
    getSchedules();
  }, []);

  console.log(schedules)
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

  const getSchedules = () => {
    ScheduleService.getSchedules().then(response => {
      const data = response.data.listaAgendamentosEspacos;
      setSchedules(data);
    }).catch(e => (
      toast.error(e.mensagem, {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const createSchedule = (e) => {
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

  const deleteSchedule = id => {
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
    <>
      {tabActive === "add" && 
        <Add 
          rooms={rooms}
          schedules={schedules}
          createSchedule={createSchedule}
        />}
      {tabActive === "delete" && 
        <Delete 
          rooms={rooms}
          deleteSchedule={deleteSchedule}
        />}
    </>
  );
}