import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import judgeStore from "../../stores/judgeStore";

const JudgeName = ({ evaluation, semester, project }) => {
  const [judgeName, setjudgeName] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => setjudgeName(event.target.value);

  const handleSubmet = (e) => {
    e.preventDefault();
    judgeStore.addJudge(
      judgeName,
      evaluation.id,
      semester.id,
      project.id,
      navigate
    );
  };

  return (
    <div>
      <Form>
        <h1 className="text-center">{project.name}</h1>
        <h2 className="text-center">{semester.name}</h2>

        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          onChange={handleChange}
        />
        <Button className="center" onClick={handleSubmet}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default JudgeName;
