import { observer } from "mobx-react";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import evaluationStore from "../../stores/evaluationStore";
import projectStore from "../../stores/projectStore";
import semesterStore from "../../stores/semesterStore";
import teamStore from "../../stores/teamStore";
import MYNavbar from "../MYNavbar";

const ProjectPage = () => {
  const { projectId } = useParams();

  const project = projectStore.projects
    ? projectStore.projects.find((project) => project.id === +projectId)
    : "";

  const semester =
    semesterStore.semesters && project
      ? semesterStore.semesters.find(
          (semester) => semester.id === project.semester
        )
      : "";

  const teams =
    teamStore.teams && project
      ? teamStore.teams
          .map((team) => (team.project === project.id ? team : null))
          .filter((team) => team !== null)
      : "";

  const teamList = teams
    ? teams.map((team) => (
        <NavLink
          key={team.id}
          className="teamList"
          to={`/details/${team.project}/${team.id}`}
        >
          {team.name}
        </NavLink>
      ))
    : "";

  const evaluations =
    evaluationStore.evaluations && project
      ? evaluationStore.evaluations.find((evaluation) =>
          evaluation.id === project.linkId.id ? evaluation : ""
        )
      : "";

  const cri = evaluations ? (
    evaluations.avg[0].criteria.map((crit) => (
      <tr key={crit.criteria_id}>
        <th className="text-center">{crit.criteria_name}</th>
        <th className="text-center">{crit.avg}%</th>
        <th className="text-center">{crit.criteria_weight}</th>
        <th className="text-center">{crit.avg_weight}</th>
      </tr>
    ))
  ) : (
    <tr>
      <th className="text-center">nothing</th>
      <th className="text-center">%</th>
      <th className="text-center">nothing</th>
      <th className="text-center">nothing</th>
    </tr>
  );

  const handleLock = (e) => {
    e.preventDefault();
    evaluations.isLocked = true;
    evaluationStore.evaluationLock(evaluations);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    evaluations.isLocked = false;
    evaluationStore.evaluationLock(evaluations);
  };

  if (evaluations && evaluations.avg.judge === 0) {
    return project && teamList && semester ? (
      <div>
        <MYNavbar titleA={"Project"} titleB={"Page"} />
        <h1 className="text-center">{project.name}</h1>
        <h5 className="text-center">{semester.name}</h5>

        <NavLink className="teamList" to={`/details/${project.id}`}>
          All
        </NavLink>
        {teamList}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Criteria</th>
              <th className="text-center">Avg. Score</th>
              <th className="text-center">Weight</th>
              <th className="text-center">Weighted Avg.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center">nothing</th>
              <th className="text-center">%</th>
              <th className="text-center">nothing</th>
              <th className="text-center">nothing</th>
            </tr>
          </tbody>
        </Table>

        <Button
          onClick={() =>
            navigator.clipboard.writeText(
              `http://localhost:3000/judge/${evaluations.id}/${semester.id}/${projectId}`
            )
          }
        >
          Copy
        </Button>
      </div>
    ) : (
      <></>
    );
  } else {
    return project && teamList && semester ? (
      <div>
        <MYNavbar titleA={"Project"} titleB={"Page"} />
        <h1 className="text-center">{project.name}</h1>
        <h5 className="text-center">{semester.name}</h5>
        <h6 className="text-center">
          This project has been evaluated by {evaluations.avg.judge} judges
        </h6>

        <NavLink className="teamList" to={`/details/${project.id}`}>
          All
        </NavLink>
        {teamList}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Criteria</th>
              <th className="text-center">Avg. Score</th>
              <th className="text-center">Weight</th>
              <th className="text-center">Weighted Avg.</th>
            </tr>
          </thead>
          <tbody>{cri}</tbody>
        </Table>
        <h3>Total: {evaluations.avg[0].total}%</h3>
        <div className="range">
          {evaluations.isLocked ? (
            <Button onClick={handleUnlock}>Unlock</Button>
          ) : (
            <Button onClick={handleLock}>Lock</Button>
          )}
          <Button
            onClick={() =>
              navigator.clipboard.writeText(
                `http://localhost:3000/judge/${evaluations.id}/${semester.id}/${projectId}`
              )
            }
          >
            Copy the link
          </Button>
        </div>
      </div>
    ) : (
      <></>
    );
  }
};

export default observer(ProjectPage);
