import axios from "axios";

const SCHEDULE_API_URL = "https://minha-morada-api.herokuapp.com/agendamento/"

class ScheduleService {
  
  getSchedules() {
    return axios.get(SCHEDULE_API_URL);
  };

  getSchedule(id) {
    return axios.get(`${SCHEDULE_API_URL}/${id}`);
  };

  createSchedule(body) {
    return axios.post(SCHEDULE_API_URL, body);
  };

  editSchedule(id, body) {
    return axios.put(`${SCHEDULE_API_URL}/${id}`, body);
  };

  deleteSchedule(id) {
    return axios.delete(`${SCHEDULE_API_URL}/${id}`);
  };
};

export default new ScheduleService();