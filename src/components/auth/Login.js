import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authstore";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleChange = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    authStore.signin(user);
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
      }}
    >
      <Form>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <FormControl
            placeholder="Your username"
            name="username"
            type="text"
            onChange={handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <FormControl
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
