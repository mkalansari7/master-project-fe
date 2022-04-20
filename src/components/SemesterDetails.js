import React, { useState } from "react";
import projectStore from "../stores/projectStore";
import ProjectDetails from "./ProjectDetails";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Accordion, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react";

const SemesterDetails = ({ semester }) => {
  const [show, setShow] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [project, setProject] = useState(null);

  const projects = projectStore.projects.map((project) => (
    <ProjectDetails key={project.id} project={project} semester={semester} />
  ));

  const handleChange = (e) =>
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });

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
    projectStore.addProject(project, semester.id);
    console.log(project);
    setShow(false);
    setProject(null);
  };

  return (
    <Accordion.Item eventKey={String(semester.id)}>
      <Accordion.Header>{semester.name}</Accordion.Header>
      <Accordion.Body>
        {!show ? (
          <div className="open-btn">
            <Button onClick={handleOpen} variant="primary">
              Add Project
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <Form.Control
              type="text"
              placeholder="Enter Project Name"
              name="name"
              onChange={handleChange}
            />
            <Form.Control
              type="text"
              placeholder="Enter Project Wieght"
              name="wieght"
              onChange={handleChange}
            />
            <div className="btns-group">
              <Button type="submit" onClick={handleSave} variant="primary">
                Save
              </Button>
              <Button onClick={handleCancle} variant="outline-dark">
                Cancel
              </Button>
            </div>
          </form>
        )}
        {projects}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default observer(SemesterDetails);
