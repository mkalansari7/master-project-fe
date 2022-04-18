import { observer } from "mobx-react";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import authStore from "../stores/authstore";

const Home = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    authStore.signout();
  };
  return (
    <div>
      <div>
        <h1>Team Evaluation</h1>
      </div>
      <div>
        {!authStore.user ? (
          <ButtonGroup aria-label="Basic example">
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </ButtonGroup>
        ) : (
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default observer(Home);
