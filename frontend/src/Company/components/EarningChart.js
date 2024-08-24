import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const EarningChart = ({ companyId }) => {
    // State to hold the iframe source URL
    const [iframeSrc, setIframeSrc] = useState('');
    const [earnings, setEarnings] = useState('1,325₪');

    // Function to generate the URL based on the selected period
    function generateChartUrl(companyId, period) {
        const now = new Date();
        let startDate;

        if (period === 'day') {
            startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // 1 day ago
        } else if (period === 'week') {
            startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // 1 week ago
        } else if (period === 'month') {
            startDate = new Date(now.setMonth(now.getMonth() - 1)); // 1 month ago
        } else {
            throw new Error('Invalid period specified. Use "day", "week", or "month".');
        }

        const startDateIso = startDate.toISOString();
        const todayIso = new Date().toISOString();

        return `https://charts.mongodb.com/charts-project-0-urzoidt/embed/charts?id=66c9a6d7-01a8-4c40-8bbc-35cb644f23b6&maxDataAge=3600&theme=light&autoRefresh=true&filter={"company_id":"${companyId}", "created_at": {"$gte": {"$date": "${startDateIso}"}, "$lte": {"$date": "${todayIso}"}}}`;
    }

    // Effect to initialize the iframe source URL
    useEffect(() => {
        // Set default period as 'day'
        setIframeSrc(generateChartUrl(companyId, 'month'));
    }, [companyId]);

    // Handle button clicks to update iframe source URL
    const handlePeriodChange = (period) => {
        setIframeSrc(generateChartUrl(companyId, period));
    };

    return (
        <div>
            <h2>{earnings}</h2>
            <br></br>
            <ButtonGroup>
                <Button onClick={() => handlePeriodChange('day')}>1 Day</Button>
                <Button onClick={() => handlePeriodChange('week')}>1 Week</Button>
                <Button onClick={() => handlePeriodChange('month')}>1 Month</Button>
            </ButtonGroup>

            <iframe
                width='100%'
                height='320'
                src={iframeSrc}
                title="IncomeChart"
            ></iframe>
        </div>
    );
};

export default EarningChart;
