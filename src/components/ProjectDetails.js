import React from "react";

const ProjectDetails = ({ project, semester }) => {
  return (
    <div>
      {semester.id === project.semester && (
        <div className="myCard2">
          <h5>{project.name}</h5>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
