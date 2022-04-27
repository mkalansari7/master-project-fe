import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

const JudgeDetails = ({ team }) => {
  const [teamState, setTeamState] = useState(team);
  const teamCopy = { ...teamState };
  const criteria = teamCopy.grade.map((grade) => (
    <div className="range">
      <label for="customRange3" class="form-label">
        {grade.criteria_name}
      </label>
      <p>0</p>
      <input
        type="range"
        class="form-range"
        min="0"
        max="10"
        step="0.5"
        id="customRange3"
        value={grade.grade}
        onChange={(e) => {
          grade.grade = +e.target.value;
          setTeamState({ ...teamCopy });
        }}
      />
      <p>10</p>
      <p>{grade.grade}</p>
    </div>
  ));
  return (
    <div>
      <Accordion.Item eventKey={String(team.team_id)}>
        <Accordion.Header>{team.team_name}</Accordion.Header>
        <Accordion.Body>{criteria}</Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default JudgeDetails;
