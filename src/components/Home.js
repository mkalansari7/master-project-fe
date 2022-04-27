import { observer } from "mobx-react";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../stores/authstore";
import MYNavbar from "./MYNavbar";

const Home = () => {
  const navigate = useNavigate();

  const moveToAdmin = (e) => {
    e.preventDefault();
    navigate("/admin", { replace: true });
  };

  return (
    <div>
      <MYNavbar titleA={"Team"} titleB={"Evaluation"} />
      <div>
        {!authStore.user ? (
          <ButtonGroup aria-label="Basic example">
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </ButtonGroup>
        ) : (
          <div>
            <Button variant="primary" onClick={moveToAdmin}>
              Go to admin page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Home);
