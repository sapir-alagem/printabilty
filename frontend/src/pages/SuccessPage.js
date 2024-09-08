import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const SuccessPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  // Function to update the job status
  const updateJobStatus = async (jobId) => {
    try {
      await axiosPrivate.post("print_jobs/update", {
        jobId,
        details: { status: "completed" },
      });
      console.log("Print job status updated to completed.");
    } catch (error) {
      console.error("Failed to update print job status:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const jobId = queryParams.get("jobId");

    if (jobId) {
      updateJobStatus(jobId);
    }
  }, [location]);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">
          Payment Successful{" "}
          <span role="img" aria-label="smiley face">
            😊
          </span>
        </h1>
        <p className="lead">
          Thank you for your payment! Your transaction was successful. You can
          collect your print job from the printer.
        </p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate(-4);
          }}
        >
          Print another document
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
