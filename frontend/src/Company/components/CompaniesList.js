import React from "react";
import Table from 'react-bootstrap/Table';
import CompanyItem from "./CompanyItem";

const CompaniesList = (props) => {
  // Ensure props.items is an array
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Printers Count</th>
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
        </Table>
      </div>
    );
  }
};

export default CompaniesList;
