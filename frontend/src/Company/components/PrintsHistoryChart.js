import React from "react";


const PrintsHistoryChart = ({ companyId}) => {

    const iframeSrcHistory = `https://charts.mongodb.com/charts-project-0-urzoidt/embed/charts?id=66c9ac24-01a8-4f33-81ad-35cb6469a9a2&maxDataAge=3600&theme=light&autoRefresh=true&filter={"company_id":"${companyId}"}`;

    return (
        <iframe
                width='100%'
                height='320'
                src={iframeSrcHistory}
                title="HisrotyChart"
        ></iframe>
    );
};

export default PrintsHistoryChart;