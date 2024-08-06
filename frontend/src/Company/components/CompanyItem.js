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

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.printersCount}</td>
      <td>
        <button className="btn btn-sm btn-primary" onClick={viewPrintersHandler}>View Printers</button>
        <button className="btn btn-sm btn-primary ml-2" onClick={viewQrCodesHandler}>View QR Codes</button>
      </td>
    </tr>
  );
};

export default CompanyItem;
