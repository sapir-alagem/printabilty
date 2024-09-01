import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrinterIndex from "../../Printer/pages/PrinterIndex";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EarningChart from '../components/EarningChart';
import PrintsHistoryChart from '../components/PrintsHistoryChart';
import NumbersDashborad from '../components/NumbersDashborad';
import DashCard from '../components/DashCard';

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        //const response = await axios.get(`http://localhost:5000/companies/${companyId}`);
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
      {company ? (
        <>
          <h1> Hey, {company.companyName}</h1>
          <br></br>
          <div className="row mb-4 gx-3">
            <div className="col-md-4 d-flex">
              <DashCard>
                <div className="row">
                  <div className="col-12">
                    <h4 className='mr-auto'>Company Info
                      <button className='btn btn-icon btn-sm'>
                        <i className="bi bi-pencil"></i>
                      </button>
                    </h4>

                    <p className='mr-auto'>Company Name: {company.companyName}</p>
                    <p className='mr-auto'>Email: {company.companyEmail}</p>
                  </div>
                </div>
                <NumbersDashborad companyId={companyId} />
              </DashCard>
            </div>
            <div className="col-md-8 d-flex">
              <DashCard>
                <PrinterIndex companyId={companyId} />
              </DashCard>
            </div>
          </div>

          <div className="row gx-3">
            <div className="col-md-4 d-flex">
              <DashCard>
                <h4 className='mr-auto'>Ernings</h4>
                <EarningChart companyId={companyId} />
              </DashCard>
            </div>

            <div className="col-md-8 d-flex">
              <DashCard>
                <h4 className='mr-auto'>Prints History</h4>
                <PrintsHistoryChart companyId={companyId} />
              </DashCard>

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
