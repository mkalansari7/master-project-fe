import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import teamStore from "../stores/teamStore";

const AddTeam = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [teams, setTeams] = useState([]);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleChange = (e) => {
    setTeams({ ...teams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTeams = { ...teams };
    let spratedTeams = newTeams.name.split(", ");
    teamStore.addTeams(spratedTeams, project.id, handleClose);
  };
  return (
    <div className="app">
      <Button variant="primary" className="btn-sm" onClick={handleOpen}>
        Add Teams
      </Button>
      <div>
        <Modal show={isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="Team-btns-group">
                <Form.Control
                  type="text"
                  placeholder="Use , to enter mulitple teams"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="Team-btns-group">
                <Button type="submit" onClick={handleSubmit} variant="primary">
                  Save
                </Button>
                <Button onClick={handleClose} variant="outline-dark">
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AddTeam;
