import React, { useState, useEffect } from "react";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import Earnings from "./Earnings";

const EarningChart = ({ companyId }) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const [timeframe, setTimeframe] = useState("month");

  useEffect(() => {
    const baseUrl =
      "https://charts.mongodb.com/charts-project-0-urzoidt/embed/charts";
    const chartId = "66c9a6d7-01a8-4c40-8bbc-35cb644f23b6";
    const maxDataAge = 60;
    const theme = "light";
    const autoRefresh = true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 30);

    let startDate;

    switch (timeframe) {
      case "day":
        startDate = today;
        break;
      case "week":
        startDate = lastWeek;
        break;
      case "month":
        startDate = lastMonth;
        break;
      default:
        throw new Error("Invalid period specified");
    }

    const startDateIso = startDate.toISOString();
    const todayIso = today.toISOString();

    const filter = JSON.stringify({
      companyId: companyId,
      created_at: {
        $gte: { $date: startDateIso },
        $lte: { $date: todayIso },
      },
      status: "completed",
    });

    const encodedFilter = encodeURIComponent(filter);

    const src = `${baseUrl}?id=${chartId}&maxDataAge=${maxDataAge}&theme=${theme}&autoRefresh=${autoRefresh}&filter=${encodedFilter}`;
    setIframeSrc(src);
  }, [companyId, timeframe]);

  const handlePeriodChange = (period) => {
    setTimeframe(period);
  };

  return (
    <div>
      <Earnings companyId={companyId} timeframe={timeframe} />
      <br></br>
      <ButtonGroup
        color="primary"
        orientation="horizontal"
        size="md"
        spacing={2}
        variant="soft"
      >
        <Button onClick={() => handlePeriodChange("day")}>Day</Button>
        <Button onClick={() => handlePeriodChange("week")}>Week</Button>
        <Button onClick={() => handlePeriodChange("month")}>Month</Button>
      </ButtonGroup>

      <iframe
        width="100%"
        height="320"
        src={iframeSrc}
        title="IncomeChart"
      ></iframe>
    </div>
  );
};

export default EarningChart;
