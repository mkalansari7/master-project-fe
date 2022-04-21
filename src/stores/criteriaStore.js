import { makeAutoObservable } from "mobx";

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
}
