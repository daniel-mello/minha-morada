import axios from "axios";

const ROOM_API_URL = "http://localhost:8080/espacos/"

class RoomService {
  
  getRooms() {
    return axios.get(ROOM_API_URL);
  };

  getRoom(id) {
    return axios.get(`${ROOM_API_URL}/${id}`);
  };

  createRoom(body) {
    return axios.post(ROOM_API_URL, body);
  };

  editRoom(id, body) {
    return axios.put(`${ROOM_API_URL}/${id}`, body);
  };

  deleteRoom(id) {
    return axios.delete(`${ROOM_API_URL}/${id}`);
  };
};

export default new RoomService();