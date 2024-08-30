import React, { useState, useEffect } from "react";
import CompaniesList from "../components/CompaniesList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Companies = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axiosPrivate.get("/companies");

        if (response.statusText !== "OK") {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [axiosPrivate]);

  const handleDeleteCompany = (id) => {
    const updatedItems = {
      ...items,
      companies: items.companies.filter((company) => company._id !== id),
    };
    setItems(updatedItems);
    filterItems(updatedItems.companies, searchTerm);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterItems(items.companies, searchTerm);
  };

  const filterItems = (companies, term) => {
    if (term.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = {
        companies: companies.filter((company) =>
          company.name.toLowerCase().includes(term.toLowerCase())
        ),
      };
      setFilteredItems(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-5 m-4">
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Search companies"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control my-4"
      />
      <CompaniesList
        items={filteredItems}
        onDeleteCompany={handleDeleteCompany}
      />
    </div>
  );
};

export default Companies;
