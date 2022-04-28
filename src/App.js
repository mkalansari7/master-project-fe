import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminPage from "./components/AdminPage";
import ProjectPage from "./components/projectPages/ProjectPage";
import ProjectTeamPage from "./components/projectPages/ProjectTeamPage";
import JudgePage from "./components/judgePages/JudgePage";
import ThankPage from "./components/ThankPage";
function App() {
  return (
    <div className="container">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/done" element={<ThankPage />} />
          <Route
            path="/judge/:evaluationId/:semesterId/:projectId"
            element={<JudgePage />}
          />
          <Route
            path="/judge/:evaluationId/:semesterId/:projectId/:judgeId"
            element={<JudgePage />}
          />
          <Route path="/details/:projectId" element={<ProjectPage />} />
          <Route
            path="/details/:projectId/:teamId"
            element={<ProjectTeamPage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
