import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import EditCompanyModal from "../../Company/components/EditCompanyModal";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const isSuperAdmin = auth?.role?.includes("super admin");

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white"
        style={{
          width: "280px",
          backgroundColor: "#3799FA",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <div
          className="d-flex justify-content-center mb-3 mb-md-0 text-white text-decoration-none"
          style={{ width: "100%" }}
        >
          <img
            src="/assets/white_logo.svg"
            alt="Logo"
            style={{ width: "75%", height: "auto" }}
          />
        </div>
        <hr />
        <ul className="nav flex-column mb-auto">
          {isSuperAdmin && (
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white ml-4 active"
                onClick={() => navigate("/companies")}
                aria-current="page"
              >
                <i className="bi bi-building-fill me-2"></i>
                Companies
              </a>
            </li>
          )}
        </ul>

        <ul className="nav flex-column mt-auto">
          <li>
            <a
              href="#"
              className="nav-link text-white ml-4"
              onClick={handleSettingsClick}
            >
              <i className="bi bi-gear-fill me-2"></i>
              Settings
            </a>
          </li>
          <li>
            <a
              href="mailto:printability@gmail.com"
              className="nav-link text-white ml-4"
            >
              <i className="bi bi-envelope-fill me-2"></i>
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link text-white ml-4"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Log Out
            </a>
          </li>
        </ul>
      </div>
      <EditCompanyModal
        show={showModal}
        handleClose={handleCloseModal}
        companyId={auth.companyId}
      />
    </>
  );
};

export default Sidebar;
