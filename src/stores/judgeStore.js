import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class JudgeStore {
  judges = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchJudges = async () => {
    try {
      const response = await instance.get("/api/judge");
      this.judges = response.data;
    } catch (error) {
      console.log("Judgestore -> fetchJudges -> error", error);
    }
  };

  addJudge = async (judgeName, evaId, semId, proId, navigate) => {
    try {
      const response = await instance.post("/api/judge/", {
        name: judgeName,
        evaluation: evaId,
      });
      this.judges.push(response.data);
      await navigate(`/judge/${evaId}/${semId}/${proId}/${response.data.id}`);
    } catch (error) {
      console.log(
        "🚀 ~ file: Judgestore.js ~ line 16 ~ Judgestore ~ addJudge= ~ error",
        error
      );
    }
  };

  updateGrade = async (judge) => {
    await instance.put(`/api/judge/${judge.id}/`, judge);
    this.fetchJudges();
  };
}

const judgeStore = new JudgeStore();
judgeStore.fetchJudges();

export default judgeStore;
