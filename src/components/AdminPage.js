import { observer } from "mobx-react";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import semesterStore from "../stores/semesterStore";
import SemesterDetails from "./SemesterDetails";

const AdminPage = () => {
  const [show, setShow] = useState(false);
  const [semesterName, setSemesterName] = useState("");

  const semsterlist = semesterStore.semesters
    .map((semester) => (
      <SemesterDetails key={semester.id} semester={semester} />
    ))
    .reverse();

  const handleChange = (event) => setSemesterName(event.target.value);

  const handleOpen = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleCancle = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    semesterStore.addSemester(semesterName);
    setShow(false);
  };

  return (
    <div className="centre">
      <h2>AdminPage</h2>
      {!show ? (
        <p onClick={handleOpen}>Add Semester</p>
      ) : (
        <Form onSubmit={handleSave}>
          <Form.Control
            type="text"
            placeholder="Enter Semester Name"
            name="name"
            onChange={handleChange}
          />
          <p onClick={handleSave}>Save</p>
          <p onClick={handleCancle}>Cancel</p>
        </Form>
      )}
      <h4>{semsterlist}</h4>
    </div>
  );
};

export default observer(AdminPage);
