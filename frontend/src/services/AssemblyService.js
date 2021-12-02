import axios from "axios";

const ASSEMBLY_API_URL = "https://minha-morada-api.herokuapp.com/assembleia/"

class AssemblyService {
  
  getAssemblies() {
    return axios.get(ASSEMBLY_API_URL);
  };

  getAssembly(id) {
    return axios.get(`${ASSEMBLY_API_URL}/${id}`);
  };

  createAssembly(body) {
    return axios.post(ASSEMBLY_API_URL, body);
  };

  editAssembly(id, body) {
    return axios.put(`${ASSEMBLY_API_URL}/${id}`, body);
  };

  deleteAssembly(id) {
    return axios.delete(`${ASSEMBLY_API_URL}/${id}`);
  };
};

export default new AssemblyService();