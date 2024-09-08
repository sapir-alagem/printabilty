import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress"; // Add loader
import OrganizationType from "../components/OrganizationType";
import CustomersType from "../components/CustomersType";
import PricingConfiguration from "../components/PricingConfiguration";
import BankingForm from "../components/BankingForm";
import SuccessfulRegistration from "../components/SuccessfulRegistration";
import CelebrationConfetti from "../components/CelebrationConfetti";

const Onboarding = ({ companyId, email }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false); // Add loader state
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const steps = [
    "Organization Type",
    "Customers Type",
    "Banking Details",
    "Service Pricing",
  ];

  const isStepOptional = (step) => step === 2;
  const isStepSkipped = (step) => skipped.has(step);

  const [formData, setFormData] = useState({
    companyType: "",
    customerType: "",
    paymentsCurrency: "ILS",
    blackAndWhitePageCost: 0.3,
    coloredPageCost: 0.6,
    bankName: "",
    accountNumber: "",
    billingAddress: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setLoading(true);

      try {
        await axios.post("/register", {
          email: email,
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
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          billingAddress: formData.billingAddress,
        });

        setLoading(false);
        setShowConfetti(true);
        setActiveStep(steps.length); // Ensure you are setting the step to the end
      } catch (error) {
        setLoading(false);
        alert(error.response.data.message);
      }
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setShowConfetti(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <OrganizationType formData={formData} handleChange={handleChange} />
        );
      case 1:
        return (
          <CustomersType formData={formData} handleChange={handleChange} />
        );
      case 2:
        return <BankingForm formData={formData} handleChange={handleChange} />;
      case 3:
        return (
          <PricingConfiguration
            formData={formData}
            handleChange={handleChange}
          />
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && showConfetti ? (
        <React.Fragment>
          <CelebrationConfetti />
          <SuccessfulRegistration formData={formData} />
          <Button onClick={handleLogin} variant="contained" color="primary">
            Log In
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            renderStepContent(activeStep)
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default Onboarding;
