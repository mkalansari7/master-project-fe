import React from "react";

const SemesterDetails = ({ semester }) => {
  return (
    <div className="myCard">
      <div className="shadow"></div>

      <h5>{semester.name}</h5>
    </div>
  );
};

export default SemesterDetails;
