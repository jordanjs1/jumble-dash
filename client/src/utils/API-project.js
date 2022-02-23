import axios from "axios";

export default {
  findProjects: function() {
    return axios.get("/api/project");
  },
  createProject: function(body) {
    return axios.post("/api/project", body);
  },
  getProject: function(id) {
    console.log("this is the id!!!!!!!",id)
    return axios.get("/api/project/" + id);
  },
  updateProject: function(id, body) {
    return axios.put("/api/project/" + id, body);
  },
  deleteProject: function(id) {
    return axios.delete("/api/project/" + id);
  }
};