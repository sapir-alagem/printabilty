import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Earnings = ({ companyId, timeframe }) => {
  const [earnings, setEarnings] = useState(0);
  const axiosPrivate = useAxiosPrivate();

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
  }, [companyId, timeframe]); // Re-run when companyId or timeframe changes

  return <h3>${earnings.toFixed(2)}</h3>;
};

export default Earnings;
