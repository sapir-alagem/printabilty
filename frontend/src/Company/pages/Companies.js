import React, { useState, useEffect } from 'react';
import CompaniesList from '../components/CompaniesList';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const Companies = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // const response = await fetch('http://localhost:5000/companies', {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   credentials: 'include'
        // });

        const response = await axiosPrivate.get('/companies');

        if (!response.statusText === 'OK') {
          throw new Error('Network response was not ok');
        }
        const data = await response.data;
        setItems(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <CompaniesList items={items} />;
};

export default Companies;
