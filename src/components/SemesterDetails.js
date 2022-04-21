import React, { useState } from "react";
import projectStore from "../stores/projectStore";
import ProjectDetails from "./ProjectDetails";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Accordion, Button, Form } from "react-bootstrap";
import { observer } from "mobx-react";
import criteriaStore from "../stores/criteriaStore";

const SemesterDetails = ({ semester }) => {
  const [show, setShow] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [project, setProject] = useState(null);
  const [newCriteria, setNewCriteria] = useState(null);

  const projects = projectStore.projects.map((project) => (
    <ProjectDetails key={project.id} project={project} semester={semester} />
  ));

  const criteriasOptions = criteriaStore.criterias.map((criteria) => (
    <option key={criteria.id} value={criteria.id}>
      {criteria.name}
    </option>
  ));

  const handleChange = (e) =>
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });

  const handleCriteriaChange = (e) =>
    setNewCriteria({
      ...newCriteria,
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
    setShow(false);
    setProject(null);
  };

  const handleAddCriteria = (e) => {
    e.preventDefault();
    criteriaStore.addCriteria(newCriteria);
    setShowCriteria(false);
    setNewCriteria(null);
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
          <form className="p-2 " onSubmit={handleSave}>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter Project Name"
              name="name"
              onChange={handleChange}
            />
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Enter Project Wieght"
              name="wieght"
              onChange={handleChange}
            />
            <Form.Select
              className="mb-2"
              multiple
              onChange={(e) => {
                const newEvent = {
                  target: {
                    name: "criteria",
                    value: [...e.target.selectedOptions].map(
                      (option) => option.value
                    ),
                  },
                };
                handleChange(newEvent);
              }}
            >
              <option disabled>Choose criterias</option>
              {criteriasOptions}
            </Form.Select>
            {!showCriteria ? (
              <Button on onClick={() => setShowCriteria(true)}>
                Add new criteria
              </Button>
            ) : (
              <div className="criteria-form">
                <Form.Control
                  className="form-control-sm"
                  type="text"
                  placeholder="Enter Criteria Name"
                  name="name"
                  onChange={handleCriteriaChange}
                />
                <Form.Control
                  className="form-control-sm"
                  type="text"
                  placeholder="Enter Criteria Wieght"
                  name="wieght"
                  onChange={handleCriteriaChange}
                />
                <Button className="btn-sm" onClick={handleAddCriteria}>
                  Submit
                </Button>
                <Button
                  variant="outline-dark"
                  className="btn-sm"
                  onClick={() => setShowCriteria(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
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
        <h3>Projects:</h3>
        {projects}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default observer(SemesterDetails);
