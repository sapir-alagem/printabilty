import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const CompanyItem = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const viewDashboardHandler = () => {
    navigate(`/companies/${props.id}/dashboard`);
  };

  const deleteCompanyHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
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
    <Tr>
      <Td className="pl-4">{props.name}</Td>
      <Td>{props.id}</Td>
      <Td>{props.printersCount}</Td>
      <Td>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-view-dashboard`}>View Dashboard</Tooltip>
          }
        >
          <button className="btn btn-icon" onClick={viewDashboardHandler}>
            <i className="bi bi-eye"></i>
          </button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-delete-company-${props.id}`}>
              Delete company
            </Tooltip>
          }
        >
          <button
            className="btn btn-icon btn-sm"
            onClick={deleteCompanyHandler}
          >
            <i className="bi bi-trash"></i>
          </button>
        </OverlayTrigger>
      </Td>
    </Tr>
  );
};

export default CompanyItem;
