import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class CriteriaStore {
  criterias = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetchCriterias = async () => {
    try {
      const response = await instance.get("/api/criteria/");
      this.criterias = response.data;
    } catch (error) {
      console.log("CriteriaStore -> fetchCriterias -> error", error);
    }
  };

  addCriteria = async (newCriteria) => {
    try {
      const response = await instance.post("/api/criteria/", newCriteria);
      this.criterias.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: CriteriaStore.js ~ line 16 ~ CriteriaStore ~ addCriteria= ~ error",
        error
      );
    }
  };
}

const criteriaStore = new CriteriaStore();
criteriaStore.fetchCriterias();

export default criteriaStore;
