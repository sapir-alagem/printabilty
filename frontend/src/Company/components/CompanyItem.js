import React from "react";
import { useNavigate } from 'react-router-dom';

const CompanyItem = (props) => {
  const navigate = useNavigate();

  const viewQrCodesHandler = () => {
    navigate(`/companies/${props.id}/qrcodes`);
  };

  const viewPrintersHandler = () => {
    navigate(`/companies/${props.id}/printers`);
  };

  const viewDashboardHandler = () => {
    navigate(`/companies/${props.id}/dashboard`);
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.id}</td>
      <td>{props.printersCount}</td>
      <td>
        <button className="btn btn-sm btn-primary" onClick={viewDashboardHandler}>View Dashboard</button>
        {/* <button className="btn btn-sm btn-primary ml-2" onClick={viewPrintersHandler}>View Printers</button> */}
        {/* <button className="btn btn-sm btn-primary ml-2" onClick={viewQrCodesHandler}>Manage QR Codes</button> */}
      </td>
    </tr>
  );
};

export default CompanyItem;
