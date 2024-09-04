import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Earnings = ({ companyId, timeframe }) => {
  const [earnings, setEarnings] = useState(0);
  const [symbol, setSymbol] = useState(" "); // Default symbol
  const axiosPrivate = useAxiosPrivate();

  const getCurrencySymbol = async () => {
    try {
      const response = await axiosPrivate.post(`/companies/currency`, {
        companyId,
      });
      setSymbol(response.data.currency); // Ensure your API returns 'currencySymbol'
    } catch (error) {
      console.error("Error fetching currency symbol:", error);
    }
  };

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axiosPrivate.get(
          `dashboard/company-earnings/${timeframe}/${companyId}`
        );
        setEarnings(response.data.totalEarnings);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    fetchEarnings();
    getCurrencySymbol(); // Fetch the currency symbol when component mounts or dependencies change
  }, [companyId, timeframe]); // Re-run when companyId or timeframe changes

  return (
    <h4 className="mr-auto">
      Earnings
      <span style={{ marginLeft: "90px" }}>
        {symbol}
        {earnings.toFixed(2)}💸
      </span>
    </h4>
  );
};

export default Earnings;
