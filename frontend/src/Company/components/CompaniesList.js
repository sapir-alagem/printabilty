import React from "react";
import Table from "react-bootstrap/Table";
import CompanyItem from "./CompanyItem";

const CompaniesList = (props) => {
  const items = Array.isArray(props.items.companies) ? props.items.companies : [];

  if (items.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>No companies found.</h2>
      </div>
    );
  } else {
    return (
      <div className="m-4">
        <h2 className="mb-4">Companies List</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Numbers of Printers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((company) => (
              <CompanyItem
                key={company._id}
                id={company._id}
                name={company.companyName}
                printersCount={company.numOfPrinters}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default CompaniesList;
