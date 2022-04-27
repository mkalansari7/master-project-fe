import React from "react";
import { Accordion, Button } from "react-bootstrap";
import judgeStore from "../../stores/judgeStore";
import JudgeDetails from "./JudgeDetails";

const JudgeEvaluate = ({ evaluation, semester, project, judge }) => {
  const teams = judge.grade.map((team) => (
    <JudgeDetails key={team.team_id} team={team} />
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    judgeStore.updateGrade(judge);
  };
  return (
    <div>
      <h1 className="text-center">{project.name}</h1>
      <h5 className="text-center">{semester.name}</h5>
      <h3 className="text-center">Hello {judge.name}</h3>
      <p className="text-center">
        Please judge the teams based on these criterias{" "}
      </p>
      <h4>Teams</h4>
      <Accordion defaultActiveKey="0">{teams}</Accordion>

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default JudgeEvaluate;
