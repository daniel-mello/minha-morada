import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

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

  useEffect(() => {
    getRooms();
    getSchedules();
  }, [tabActive]);

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
    })
  };

  const createSchedule = (e, roomId) => {
    e.preventDefault();

    const now = moment().format("DD/MM/YYYY hh:mm");

    const body = {
      "agendamentoEspaco": {
        dataHoraAgendamento: now,
        espaco: {
          id: roomId
        },
        morador: {
          id: 1
        }
      }
    };

    ScheduleService.createSchedule(body).then(response => {
      toast.success("Agendamento criado com sucesso!", {
        position: toast.POSITION.TOP_CENTER
      });
      setCreateData("");
      getRooms();
      return setSchedules([ ...schedules, body ]);
    }).catch(e => (
      toast.error("Erro: Tente novamente ou entre em contato conosco.", {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  const deleteSchedule = id => {
    const schedule = schedules.find(it => it.espaco.id === id);

    ScheduleService.deleteSchedule(schedule.id).then(response => {
      toast.success(response.data.mensagem, {
        position: toast.POSITION.TOP_CENTER
      });
      getRooms();
      getSchedules();
    }).catch(e => (
      toast.error("Erro: Tente novamente ou entre em contato conosco.", {
        position: toast.POSITION.TOP_CENTER
      })
    ));
  };

  return (
    <>
      {tabActive === "add" && <Add rooms={rooms} schedules={schedules} createSchedule={createSchedule} />}
      {tabActive === "delete" && <Delete rooms={rooms} schedules={schedules} deleteSchedule={deleteSchedule} />}
    </>
  );
}