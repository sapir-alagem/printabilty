import React from "react";
import Table from 'react-bootstrap/Table';
import CompanyItem from "./CompanyItem";

const CompaniesList = (props) => {
  if (props.items.length === 0) {
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
            </tr>
          </thead>
          <tbody>
            {props.items.map((company) => (
              <CompanyItem
                key={company.id}
                id={company.id}
                name={company.name}
                printersCount={company.printersCount}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default CompaniesList;
