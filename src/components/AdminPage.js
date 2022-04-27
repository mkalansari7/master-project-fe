import { observer } from "mobx-react";
import React, { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import authStore from "../stores/authstore";
import semesterStore from "../stores/semesterStore";
import MYNavbar from "./MYNavbar";
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
  if (authStore.user) {
    return (
      <>
        <MYNavbar titleA={"Admin"} titleB={"Page"} />
        <Accordion defaultActiveKey="0">
          <div className="admin border">
            {!show ? (
              <div className="open-btn">
                <Button onClick={handleOpen} variant="primary">
                  Add Semester
                </Button>
              </div>
            ) : (
              <Form className="p-2" onSubmit={handleSave}>
                <Form.Control
                  type="text"
                  placeholder="Enter Semester Name"
                  name="name"
                  onChange={handleChange}
                />
                <div className="btns-group">
                  <Button onClick={handleSave} variant="primary">
                    Save
                  </Button>
                  <Button onClick={handleCancle} variant="outline-dark">
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </div>
          {semsterlist}
        </Accordion>
      </>
    );
  } else {
    return (
      <div>
        <h1>Page not found</h1>
      </div>
    );
  }
};

export default observer(AdminPage);
