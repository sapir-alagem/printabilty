import React, { useState, useEffect } from "react";
import CompanyItem from "./CompanyItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spinner from "react-bootstrap/Spinner";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

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
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>No companies found.</h2>
      </div>
    );
  } else {
    return (
      <div>
        <Table className="table table-hover">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>ID</Th>
              <Th># Printers</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
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
          </Tbody>
        </Table>
      </div>
    );
  }
};

export default CompaniesList;
