import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Add } from "./add";
import { Delete } from "./delete";

import RoomService from "../../../services/RoomService";
import ScheduleService from "../../../services/ScheduleService";

export const Schedule = ({ tabActive }) => {
  const [rooms, setRooms] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getRooms();
    getSchedules();
  }, []);

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
      const data = response.data.listaAgendamentosEspaços;
      setSchedules(data);
    })
  };

  return (
    <>
      {tabActive === "add" && <Add rooms={rooms} schedules={schedules} />}
      {tabActive === "delete" && <Delete rooms={rooms} schedules={schedules} />}
    </>
  );
}