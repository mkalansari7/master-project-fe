import { observer } from "mobx-react";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../stores/authstore";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    authStore.signout();
  };

  const moveToAdmin = (e) => {
    e.preventDefault();
    navigate("/admin", { replace: true });
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
          <div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="secondary" onClick={moveToAdmin}>
              Go to admin page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Home);
