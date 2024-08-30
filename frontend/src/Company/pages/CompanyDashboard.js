import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrinterIndex from "../../Printer/pages/PrinterIndex";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading)
    return (
      <div className="container mt-4">
        <div>Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="container mt-4">
        <div>{error}</div>
      </div>
    );

  return (
    <div className="p-5 w-100 m-0" style={{ backgroundColor: '#EFF7FF', minHeight: '100vh' }}>
      <h1 className="mb-4">Company Dashboard</h1>
      {company ? (
        <>
          <div className="row mb-4 gx-3">
            <div className="col-md-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <h5 className="card-title mb-4">Company Info</h5>
                  <p className="card-text">
                    Company Name: 
                    <span className="text-primary ml-3">{company.name}</span>
                  </p>
                  <p className="card-text">
                    Admin User:
                    <span className="text-primary ml-3">{}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-8 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <PrinterIndex companyId={companyId} />
                </div>
              </div>
            </div>
          </div>

          <div className="row gx-3">
            <div className="col-md-4 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <h5 className="card-title">KIP payments</h5>
                </div>
              </div>
            </div>

            <div className="col-md-8 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <h5 className="card-title">Print History</h5>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Printer</th>
                        <th>Price -- render $</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Event A</td>
                        <td>2024-08-01</td>
                        <td>Details of Event A</td>
                        <td>Details of Event A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No company details available.</div>
      )}
    </div>
  );
};

export default CompanyDashboard;
