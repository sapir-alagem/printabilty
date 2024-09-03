import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CompanyItem = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const viewDashboardHandler = () => {
    navigate(`/companies/${props.id}/dashboard`);
  };

  const deleteCompanyHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) {
      return;
    }
    
    try {
      await axiosPrivate.delete(`/companies/${props.id}`);
      props.onDelete(props.id);
    } catch (error) {
      alert("Failed to delete company: " + error.message);
    }
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.id}</td>
      <td>{props.printersCount}</td>
      <td>
        <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-view-dashboard`}>View Dashboard</Tooltip>}>
          <button className="btn btn-icon" onClick={viewDashboardHandler}>
            <i className="bi bi-eye"></i>
          </button>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={
            <Tooltip id={`tooltip-delete-company-${props.id}`}>
              Delete company
            </Tooltip>
          }
        >
          <button className="btn btn-icon btn-sm" onClick={deleteCompanyHandler}>
            <i className="bi bi-trash"></i>
          </button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default CompanyItem;
