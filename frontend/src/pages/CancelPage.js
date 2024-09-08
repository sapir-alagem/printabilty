import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CancelPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const updateJobStatus = async (jobId) => {
    try {
      await axiosPrivate.post("print_jobs/update", {
        jobId,
        details: { status: "declined" },
      });
      console.log("Print job status updated to canceled.");
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
          Payment Canceled{" "}
          <span role="img" aria-label="sad face">
            😔
          </span>
        </h1>
        <p className="lead">Your payment was canceled. Please try again.</p>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate(-4);
          }}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default CancelPage;
