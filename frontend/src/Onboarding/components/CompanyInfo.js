import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
} from "react-icons/fa";

const CompanyInfo = ({ formData, handleChange }) => {
  return (
    <div className="content">
      <h3>Company Information</h3>
      <h4>Hey, {formData.companyName} !</h4>

      <h5>What type of organization do you represent?</h5>
      <ButtonGroup>
        <Button
          variant={
            formData.companyType === "Public Library"
              ? "primary"
              : "outline-primary"
          }
          name="companyType"
          value="Public Library"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaBook className="mr-2" /> Public Library
        </Button>
        <Button
          variant={
            formData.companyType === "Open Space"
              ? "primary"
              : "outline-primary"
          }
          name="companyType"
          value="Open Space"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaDoorOpen className="mr-2" /> Open Space
        </Button>
        <Button
          variant={
            formData.companyType === "Internet Café"
              ? "primary"
              : "outline-primary"
          }
          name="companyType"
          value="Internet Café"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaCoffee className="mr-2" /> Internet Café
        </Button>
        <Button
          variant={
            formData.companyType === "Corporate Office"
              ? "primary"
              : "outline-primary"
          }
          name="companyType"
          value="Corporate Office"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaBuilding className="mr-2" /> Corporate Office
        </Button>
        <Button
          variant={
            formData.companyType === "Educational Institution"
              ? "primary"
              : "outline-primary"
          }
          name="companyType"
          value="Educational Institution"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaSchool className="mr-2" /> Educational Institution
        </Button>
        <Button
          variant={
            formData.companyType === "Other" ? "primary" : "outline-primary"
          }
          name="companyType"
          value="Other"
          onClick={handleChange}
          className="d-flex align-items-center"
        >
          <FaIndustry className="mr-2" /> Other
        </Button>
      </ButtonGroup>

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

export default CompanyInfo;
