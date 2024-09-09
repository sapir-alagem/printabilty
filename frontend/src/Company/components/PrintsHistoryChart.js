import React from "react";
import { useState, useEffect } from "react";

const PrintsHistoryChart = ({ companyId }) => {
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const baseUrl =
      "https://charts.mongodb.com/charts-project-0-urzoidt/embed/charts";
    const chartId = "66c9ac24-01a8-4f33-81ad-35cb6469a9a2";
    const maxDataAge = 300;
    const theme = "light";
    const autoRefresh = true;

    const filter = JSON.stringify({
      companyId: companyId,
      status: "completed",
    });

    const encodedFilter = encodeURIComponent(filter);

    const src = `${baseUrl}?id=${chartId}&maxDataAge=${maxDataAge}&theme=${theme}&autoRefresh=${autoRefresh}&filter=${encodedFilter}`;

    setIframeSrc(src);
  }, [companyId]);

  return (
    <iframe
      style={{
        background: "#FFFFFF",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
      }}
      width="100%"
      height="90%"
      src={iframeSrc}
      title="MongoDB Chart"
    ></iframe>
  );
};

export default PrintsHistoryChart;
