import { observer } from "mobx-react";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import teamStore from "../stores/teamStore";
import AddTeam from "./AddTeam";

const ProjectDetails = ({ project, semester }) => {
  const navigate = useNavigate();
  const teams = teamStore.teams.map((team) =>
    team.project === project.id ? team.name + ", " : null
  );

  return (
    <div>
      {semester.id === project.semester && (
        <div className="myCard2">
          <h5>{project.name}</h5>
          <h5 style={{ padding: "0 5px" }}>-</h5>
          <h6>{teams}</h6>
          <div className="addTeamBtn">
            <Button
              onClick={() => navigate(`/details/${project.id}`)}
              className="btn-sm"
            >
              Project Details
            </Button>
            <AddTeam project={project} />
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ProjectDetails);
