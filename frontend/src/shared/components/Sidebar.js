import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white" style={{ width: "280px", backgroundColor: "#3799FA" }}>
    <a href="/" className="d-flex justify-content-center mb-3 mb-md-0 text-white text-decoration-none" style={{ width: "100%" }}>
      <img src="/assets/white_logo.svg" alt="Logo" style={{ width: "75%", height: "auto" }}/>
    </a>
      <hr />
      <ul className="nav flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link text-white active" onClick={() => navigate("/companies")} aria-current="page">
            <i className="bi bi-building-fill me-2"></i>
            Companies
          </a>
        </li>
      </ul>

      <ul className="nav flex-column mt-auto">
        <li>
          <a href="#" className="nav-link text-white" onClick={() => navigate("/settings")}>
            <i class="bi bi-gear-fill me-2"></i>
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white" onClick={() => navigate("/contact")}>
            <i class="bi bi-envelope-fill me-2"></i>
            Contact Us
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white" onClick={handleLogout}>
          <i class="bi bi-box-arrow-right me-2"></i>
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
