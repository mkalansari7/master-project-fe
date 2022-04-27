import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import evaluationStore from "../../stores/evaluationStore";
import judgeStore from "../../stores/judgeStore";
import projectStore from "../../stores/projectStore";
import semesterStore from "../../stores/semesterStore";
import JudgeEvaluate from "./JudgeEvaluate";
import JudgeName from "./JudgeName";

const JudgePage = () => {
  const { evaluationId, semesterId, projectId, judgeId } = useParams();

  const evaluation = evaluationStore.evaluations
    ? evaluationStore.evaluations.find(
        (evaluation) => evaluation.id === evaluationId
      )
    : "";

  const project = projectStore.projects
    ? projectStore.projects.find((project) => project.id === +projectId)
    : "";

  const semester = semesterStore.semesters
    ? semesterStore.semesters.find((semester) => semester.id === +semesterId)
    : "";

  const judge =
    judgeStore.judges && judgeId
      ? judgeStore.judges.find((judge) => judge.id === +judgeId)
      : "";

  if (evaluation ? !evaluation.isLocked : false) {
    return evaluation && project && semester && judge ? (
      <JudgeEvaluate
        evaluation={evaluation}
        semester={semester}
        project={project}
        judge={judge}
      />
    ) : evaluation && project && semester && !judgeId ? (
      <JudgeName
        evaluation={evaluation}
        semester={semester}
        project={project}
      />
    ) : (
      <div>
        <h1>Page not found</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Link is Locked</h1>
      </div>
    );
  }
};

export default observer(JudgePage);
