import React, { useState } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerType from "../components/CustomersType";
import PricingConfiguration from "../components/PricingConfiguration";
import OrganizationType from "../components/OrganizationType";
import "./StepButtons.css";
import axios from "../../api/axios";

const Onboarding = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(16);
  const [companyId, setCompanyId] = useState(urlParams.get("companyId"));

  const [formData, setFormData] = useState({
    companyName: urlParams.get("name"),
    companyMail: urlParams.get("email"),
    companyType: "",
    customerType: "",
    paymentsCurrency: "ILS",
    blackAndWhitePageCost: 0.3,
    coloredPageCost: 0.6,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    switch (step) {
      case 1:
        setProgress(16);
        break;
      case 2:
        setProgress(50);
        break;
      case 3:
        setProgress(100);
        break;
      default:
        setProgress(16);
    }
  };

  const handleNext = async () => {
    if (activeStep < 3) {
      handleStepChange(activeStep + 1);
    } else if (activeStep === 3) {
      try {
        await axios.post("/register", {
          email: formData.companyMail,
          role: ["company admin"],
          companyId: companyId,
        });

        await axios.post("/companies/update", {
          companyId: companyId,
          type: formData.companyType,
          customerType: formData.customerType,
          paymentsCurrency: formData.paymentsCurrency,
          blackAndWhitePageCost: formData.blackAndWhitePageCost,
          coloredPageCost: formData.coloredPageCost,
        });

        window.location.href = "/login";
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const handlePrevious = () => {
    if (activeStep > 1) {
      handleStepChange(activeStep - 1);
    }
  };

  return (
    <div className="container mt-4">
      <div className="progress-buttons-wrapper position-relative">
        <ProgressBar
          now={progress}
          variant="info"
          className="progress-bar-custom"
        />
        <div className="grid-container">
          <div className="grid-item">
            <Button
              className={`step-button ${activeStep === 1 ? "active" : ""}`}
            >
              1
            </Button>
          </div>
          <div className="grid-item">
            <Button
              className={`step-button ${activeStep === 2 ? "active" : ""}`}
            >
              2
            </Button>
          </div>
          <div className="grid-item">
            <Button
              className={`step-button ${activeStep === 3 ? "active" : ""}`}
            >
              3
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        {activeStep === 1 && (
          <Card>
            <Card.Body>
              <OrganizationType
                formData={formData}
                handleChange={handleChange}
              />
            </Card.Body>
          </Card>
        )}
        {activeStep === 2 && (
          <Card>
            <Card.Body>
              <CustomerType formData={formData} handleChange={handleChange} />
            </Card.Body>
          </Card>
        )}
        {activeStep === 3 && (
          <Card>
            <Card.Body>
              <PricingConfiguration
                formData={formData}
                handleChange={handleChange}
              />
            </Card.Body>
          </Card>
        )}
      </div>

      <div className="text-center mt-4">
        {activeStep === 1 && (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {activeStep > 1 && (
          <>
            <Button variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant="primary" onClick={handleNext} className="ml-2">
              {activeStep === 3 ? "Submit" : "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
