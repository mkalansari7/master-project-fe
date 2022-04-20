import React from "react";

const ProjectDetails = ({ project, semester }) => {
  const teams = project.team.map((tem) => tem.name + ", ");
  console.log(teams);

  return (
    <div>
      {semester.id === project.semester && (
        <div className="myCard2">
          <h5>{project.name}</h5>
          <h5 style={{ padding: "0 5px" }}>-</h5>
          <h6>{teams}</h6>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
