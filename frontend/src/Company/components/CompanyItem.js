import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CompanyItem = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const viewDashboardHandler = () => {
    navigate(`/companies/${props.id}/dashboard`);
  };

  const deleteCompanyHandler = async () => {
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
        <button
          className="btn btn-sm btn-primary"
          onClick={viewDashboardHandler}
        >
          View Dashboard
        </button>
        <button
          className="btn btn-sm btn-danger ml-2"
          onClick={deleteCompanyHandler}
        >
          Delete company
        </button>
      </td>
    </tr>
  );
};

export default CompanyItem;
