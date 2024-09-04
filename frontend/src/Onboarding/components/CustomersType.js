import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  FaBook,
  FaCoffee,
  FaBuilding,
  FaSchool,
  FaUsers,
  FaDoorOpen,
  FaUserGraduate,
  FaUserTie,
  FaUser,
  FaUserSecret,
  FaUserAstronaut,
  FaIndustry,
} from "react-icons/fa"; // Import icons

const CustomerType = ({ formData, handleChange }) => {
  return (
    <div className="content">
      <h5>Who are your customers?</h5>
      <ButtonGroup>
        <Button
          variant={
            formData.customerType === "Casual Customers"
              ? "info"
              : "outline-info"
          }
          name="customerType"
          value="Casual Customers"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaUser className="mr-2" /> Casual Customers
        </Button>
        <Button
          variant={
            formData.customerType === "Business Clients"
              ? "info"
              : "outline-info"
          }
          name="customerType"
          value="Business Clients"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaUserTie className="mr-2" /> Business Clients
        </Button>
        <Button
          variant={
            formData.customerType === "Tourists" ? "info" : "outline-info"
          }
          name="customerType"
          value="Tourists"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaUserSecret className="mr-2" /> Tourists
        </Button>
        <Button
          variant={
            formData.customerType === "Students" ? "info" : "outline-info"
          }
          name="customerType"
          value="Students"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaUserGraduate className="mr-2" /> Students
        </Button>
        <Button
          variant={
            formData.customerType === "Local Community"
              ? "info"
              : "outline-info"
          }
          name="customerType"
          value="Local Community"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaUsers className="mr-2" /> Local Community
        </Button>
        <Button
          variant={formData.customerType === "Other" ? "info" : "outline-info"}
          name="customerType"
          value="Other"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaUserAstronaut className="mr-2" /> Other
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomerType;
