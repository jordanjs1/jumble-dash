import axios from "axios";

export default {
  createProblem: function(body) {
    return axios.post("/api/problem", body);
  },
  getUnsolvedProblems: function(id) {
    return axios.get("/api/problem/" + id + "/unsolved");
  },
  getSolvedProblems: function(id) {
    return axios.get("/api/problem/" + id + "/solved");
  },
  updateProblem: function(id, body) {
    return axios.put("/api/problem/" + id, body);
  },
  removeProblem: function(id) {
    return axios.delete("/api/problem/" + id);
  }
};