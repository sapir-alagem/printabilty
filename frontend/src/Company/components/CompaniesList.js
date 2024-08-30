import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import CompanyItem from "./CompanyItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner

const CompaniesList = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [printerCounts, setPrinterCounts] = useState({});

  const items = Array.isArray(props.items.companies)
    ? props.items.companies
    : [];

  useEffect(() => {
    const fetchPrinterCounts = async () => {
      try {
        const counts = {};
        for (const company of items) {
          const result = await axiosPrivate.get(
            `/companies/${company._id}/countPrinters`
          );
          counts[company._id] = result.data.printers;
        }
        setPrinterCounts(counts);
      } catch (error) {
        console.error("Error fetching printer counts:", error);
      }
    };

    fetchPrinterCounts();
  }, [items, axiosPrivate]);

  if (items.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>No companies found.</h2>
      </div>
    );
  } else {
    return (
      <div className="m-4">
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
                name={company.name}
                printersCount={
                  printerCounts[company._id] !== undefined ? (
                    printerCounts[company._id]
                  ) : (
                    <Spinner animation="border" size="sm" />
                  )
                }
                onDelete={props.onDeleteCompany}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default CompaniesList;
