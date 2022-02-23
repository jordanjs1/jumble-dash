import axios from "axios";

export default {
  createBudget: function(body) {
    return axios.post("/api/budget", body);
  },
  getBudget: function(id) {
    return axios.get("/api/budget/" + id);
  },
  updateBudget: function(id, body) {
    return axios.put("/api/budget/" + id, body);
  }
};