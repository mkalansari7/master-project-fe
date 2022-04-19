import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class SemesterStore {
  semesters = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchSemesters = async () => {
    try {
      const response = await instance.get("/api/semester");
      this.semesters = response.data;
    } catch (error) {
      console.log("SemesterStore -> fetchSemesters -> error", error);
    }
  };

  addSemester = async (semesterName) => {
    try {
      const response = await instance.post("/api/semester/", {
        name: semesterName,
      });
      console.log(response);
      this.semesters.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: SemesterStore.js ~ line 16 ~ SemesterStore ~ addSemester= ~ error",
        error
      );
    }
  };
}

const semesterStore = new SemesterStore();
semesterStore.fetchSemesters();

export default semesterStore;
