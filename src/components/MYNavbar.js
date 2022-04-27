import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authStore from "../stores/authstore";

const MYNavbar = ({ titleA, titleB }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    authStore.signout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container>
        <Link to="/" className="navbar-brand text-light fw-bold">
          <span className="text-primary">{titleA}</span>
          <span className="fw-lighter">{titleB}</span>
        </Link>
        {authStore.user && (
          <div>
            <span className="text-light" style={{ marginRight: "12px" }}>
              Hi {authStore.user.username},{" "}
            </span>
            <Button onClick={handleLogout} variant="primary">
              Logout
            </Button>
            {/* <span
              onClick={handleLogout}
              className="text-light"
              style={{ cursor: "pointer" }}
            >
              Logout
            </span> */}
          </div>
        )}
      </Container>
    </nav>
  );
};

export default MYNavbar;
