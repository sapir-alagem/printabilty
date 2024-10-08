import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrinterIndex from "../../Printer/pages/PrinterIndex";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EarningChart from "../components/EarningChart";
import PrintsHistoryChart from "../components/PrintsHistoryChart";
import NumbersDashborad from "../components/NumbersDashborad";
import DashCard from "../components/DashCard";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import Loader from "../../shared/components/Loader";

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltipText, setTooltipText] = useState("Copy");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axiosPrivate.get(`/companies/${companyId}`);
        setCompany(response.data.company);
      } catch (error) {
        setError("Error fetching company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(companyId);
    setTooltipText("Copied!");
    setTimeout(() => {
      setTooltipText("Copy");
    }, 1500);
  };

  if (loading)
    return (
      <div className="container mt-4">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="container mt-4">
        <div>{error}</div>
      </div>
    );

  return (
    <div
      className="p-5 w-100 m-0"
      style={{
        backgroundColor: "#EFF7FF",
        minHeight: "100vh",
        ...(isMobile && {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }),
      }}
    >
      {company ? (
        <>
          <h1> Hey, {company.name}! &#x1F44B;</h1>
          <br></br>
          <div className="row mb-4 gx-3">
            <div
              className="col-md-4 d-flex"
              style={{ marginBottom: isMobile ? "20px" : "0" }}
            >
              <DashCard>
                <h4 className="mr-auto">Company Info</h4>
                <p className="card-text">
                  Company Name:
                  <span className="text-primary ml-3">{company.name}</span>
                </p>
                <p className="card-text">
                  {isMobile ? "ID:" : "Company ID:"}
                  <span className="text-primary ml-3">{companyId}</span>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-copy-to-clipboard`}>
                        {tooltipText}
                      </Tooltip>
                    }
                  >
                    {isMobile ? (
                      <Button
                        variant="primary"
                        onClick={copyToClipboard}
                        style={{ width: "100%", marginTop: "1rem" }}
                      >
                        Copy Id
                      </Button>
                    ) : (
                      <button className="btn btn-xs" onClick={copyToClipboard}>
                        <i className="bi bi-copy"></i>
                      </button>
                    )}
                  </OverlayTrigger>
                  <NumbersDashborad companyId={companyId} />
                </p>
              </DashCard>
            </div>

            <div className="col-md-8 d-flex">
              <DashCard>
                <PrinterIndex companyId={companyId} />
              </DashCard>
            </div>
          </div>

          <div className="row gx-3">
            <div
              className="col-md-4 d-flex"
              style={{ marginBottom: isMobile ? "20px" : "0" }}
            >
              <DashCard>
                <EarningChart companyId={companyId} />
              </DashCard>
            </div>

            <div className="col-md-8 d-flex">
              {!isMobile ? (
                <DashCard>
                  <h4 className="mr-auto">Prints History</h4>
                  <PrintsHistoryChart companyId={companyId} />
                </DashCard>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className="mb-4">Company Dashboard</h1>
          No company details available.
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
