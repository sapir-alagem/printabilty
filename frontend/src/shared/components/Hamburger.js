import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import EditCompanyModal from "../../Company/components/EditCompanyModal";
import useAuth from "../../hooks/useAuth";

const Hamburger = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsMenuOpen(false); // Close the menu after logging out
  };

  const handleSettingsClick = () => {
    setShowModal(true);
    setIsMenuOpen(false); // Close the menu after opening the settings modal
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu after navigating
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isSuperAdmin = auth?.role?.includes("super admin");

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="btn text-white d-md-none"
        onClick={toggleMenu}
        style={{
          position: "fixed",
          top: "10px",
          left: "-10px",
          zIndex: 1000,
        }}
      >
        <i
          className="bi bi-list"
          style={{ fontSize: "1.5rem", color: "black" }}
        ></i>
      </button>

      {/* Sliding Menu from the Top */}
      <div
        className={`menu ${isMenuOpen ? "menu-open" : ""}`}
        style={{
          position: "fixed",
          top: isMenuOpen ? 0 : "-100%",
          left: 0,
          width: "100%",
          backgroundColor: "#3799FA",
          color: "white",
          transition: "top 0.4s ease",
          zIndex: 999,
        }}
      >
        <div className="d-flex justify-content-center mb-3 text-white text-decoration-none">
          <img
            src="/assets/white_logo.svg"
            alt="Logo"
            style={{ width: "75%", height: "auto", paddingTop: "10px" }}
          />
        </div>
        <hr />
        <ul className="nav flex-column mb-auto">
          {isSuperAdmin && (
            <li className="nav-item">
              <a
                href="#"
                className="nav-link text-white ml-4 active"
                onClick={() => handleMenuItemClick("/companies")}
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
        handleClose={() => setShowModal(false)}
        companyId={auth.companyId}
      />
    </>
  );
};

export default Hamburger;
