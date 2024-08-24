import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PrinterIndex from '../../Printer/pages/PrinterIndex';
import EarningChart from '../components/EarningChart';
import PrintsHistoryChart from '../components/PrintsHistoryChart';
import NumbersDashborad from '../components/NumbersDashborad';
import DashCard from '../components/DashCard';

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/companies/${companyId}`);
        setCompany(response.data.company);
      } catch (error) {
        setError('Error fetching company details');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (loading) return <div className="container mt-4"><div>Loading...</div></div>;
  if (error) return <div className="container mt-4"><div>{error}</div></div>;

  return (
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
            <EarningChart companyId={companyId}/>
          </DashCard>
        </div>
        <div className="col-md-8 d-flex">
        <DashCard>
          <h4 className='mr-auto'>Prints History</h4>
          <PrintsHistoryChart companyId={companyId}/>
          </DashCard>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
