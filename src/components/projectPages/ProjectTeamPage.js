import { observer } from "mobx-react";
import React from "react";
import { Table } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import evaluationStore from "../../stores/evaluationStore";
import projectStore from "../../stores/projectStore";
import semesterStore from "../../stores/semesterStore";
import teamStore from "../../stores/teamStore";
import MYNavbar from "../MYNavbar";

const ProjectTeamPage = () => {
  const { projectId, teamId } = useParams();

  const project = projectStore.projects
    ? projectStore.projects.find((project) => project.id === +projectId)
    : "";

  const semester =
    semesterStore.semesters && project
      ? semesterStore.semesters.find(
          (semester) => semester.id === project.semester
        )
      : "";

  const teams = teamStore.teams
    ? project
      ? teamStore.teams
          .map((team) => (team.project === project.id ? team : null))
          .filter((team) => team !== null)
      : ""
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
  console.log(evaluations.avg[teamId]);
  const cri =
    evaluations && evaluations.judge.length !== 0 ? (
      evaluations.avg[teamId].criteria ? (
        evaluations.avg[teamId].criteria.map((crit) => (
          <tr key={crit.criteria_id}>
            <th className="text-center">{crit.criteria_name}</th>
            <th className="text-center">{crit.avg}%</th>
            <th className="text-center">{crit.criteria_weight}</th>
            <th className="text-center">{crit.avg_weight}</th>
          </tr>
        ))
      ) : (
        ""
      )
    ) : (
      <tr>
        <th className="text-center">nothing</th>
        <th className="text-center">%</th>
        <th className="text-center">nothing</th>
        <th className="text-center">nothing</th>
      </tr>
    );

  const notes = evaluations
    ? evaluations.avg[teamId].notes.map((note) => (
        <div>
          <hr />
          <b>{note.judge_name} Says:</b> <p>{note.note}</p>
        </div>
      ))
    : "";

  if (evaluations && evaluations.avg ? evaluations.avg.judge === 0 : true) {
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
        <h3>Total: {evaluations.avg[teamId].total}%</h3>
        <div className="border p-3">
          <h1 className="text-center">Note</h1>
          {notes}
        </div>
      </div>
    ) : (
      <></>
    );
  }
};

export default observer(ProjectTeamPage);
