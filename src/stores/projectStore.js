import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class ProjectStore {
  projects = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchProjects = async () => {
    try {
      const response = await instance.get("/api/project/");
      this.projects = response.data;
    } catch (error) {
      console.log("Projectstore -> fetchProjects -> error", error);
    }
  };

  addProject = async (project, semesterId) => {
    try {
      project.semester = semesterId;
      const response = await instance.post("/api/project/", project);
      this.projects.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ProjectStore.js ~ line 16 ~ ProjectStore ~ addProject= ~ error",
        error
      );
    }
  };
}

const projectStore = new ProjectStore();
projectStore.fetchProjects();

export default projectStore;
