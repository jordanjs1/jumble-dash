import axios from "axios";

export default {
  createTask: function(body) {
    return axios.post("/api/task", body);
  },
  getTasks: function(id) {
    return axios.get("/api/task/" + id);
  },
  getIncompleteTasks: function(id) {
    return axios.get("/api/task/" + id + "/incomplete");
  },
  getUnsovedTaskProblems: function(id) {
    return axios.get("/api/task/" + id + "/unsolved");
  },
  getSovledTaskProblems: function(id) {
    return axios.get("/api/task/" + id + "/solved");
  },
  updateTask: function(id, body) {
    return axios.put("/api/task/" + id, body);
  },
  removeTask: function(id) {
    return axios.delete("/api/task/" + id);
  }
};