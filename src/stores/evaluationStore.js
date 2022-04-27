import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class EvaluationStore {
  evaluations = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchEvaluations = async () => {
    try {
      const response = await instance.get("/api/evaluation/");
      this.evaluations = response.data;
    } catch (error) {
      console.log("Evaluationstore -> fetchEvaluations -> error", error);
    }
  };

  addEvaluation = async (projectId) => {
    try {
      const response = await instance.post("/api/evaluation/", {
        project: projectId,
      });
      this.evaluations.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: EvaluationStore.js ~ line 16 ~ EvaluationStore ~ addEvaluation= ~ error",
        error
      );
    }
  };

  evaluationLock = async (evaluation) => {
    await instance.put(`/api/evaluation/${evaluation.id}/`, evaluation);
    this.fetchEvaluations();
  };
}

const evaluationStore = new EvaluationStore();
evaluationStore.fetchEvaluations();

export default evaluationStore;
