import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class TeamStore {
  teams = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchTeams = async () => {
    try {
      const response = await instance.get("/api/team/");
      this.teams = response.data;
    } catch (error) {
      console.log("TeamStore -> fetchTeams -> error", error);
    }
  };

  addTeams = async (teams, projectId, handleClose) => {
    try {
      teams.forEach(async (team) => {
        const response = await instance.post("/api/team/", {
          name: team,
          project: projectId,
        });
        this.teams.push(response.data);
        handleClose();
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: TeamStore.js ~ line 16 ~ TeamStore ~ addTeams= ~ error",
        error
      );
    }
  };
}

const teamStore = new TeamStore();
teamStore.fetchTeams();
export default teamStore;
