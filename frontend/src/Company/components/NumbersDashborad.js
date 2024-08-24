import React from "react";

const NumbersDashborad = ({companyId}) => {
    const iframeSrcPrinters = `https://charts.mongodb.com/charts-project-0-urzoidt/embed/charts?id=66c9c0a6-9c73-4f6f-8bbf-e195df8da9c5&maxDataAge=-1&theme=light&autoRefresh=false&filter={"company_id":"${companyId}"}`;
    const iframeSrcActivePrinters = `https://charts.mongodb.com/charts-project-0-urzoidt/embed/charts?id=0f4230d6-f575-4ec7-b142-df86a33af642&maxDataAge=-1&theme=light&autoRefresh=false&filter={"company_id":"${companyId}"}`;
    const iframeSrcPrintJobs = `https://charts.mongodb.com/charts-project-0-urzoidt/embed/charts?id=66c9c0fd-2924-428a-8ffb-5e932f448647&maxDataAge=-1&theme=light&autoRefresh=false&filter={"company_id":"${companyId}"}`;

    const boxStyle = {
        border: '1px solid #D3D3D3',
        borderRadius: '15px',
    }

    return (
        <div className="row mt-3">
            <div className="col-md-4">
                <iframe
                    style={boxStyle}
                    width='100%'
                    height='100%'
                    src={iframeSrcPrinters}>
                </iframe>
            </div>
            <div className="col-md-4">
                <iframe
                    style={boxStyle}
                    width='100%'
                    height='100%'
                    src={iframeSrcActivePrinters}>
                </iframe>
            </div>
            <div className="col-md-4">
                <iframe
                    style={boxStyle}
                    width='100%'
                    height='100%'
                    src={iframeSrcPrintJobs}>
                </iframe>
            </div>
        </div>
    );
};

export default NumbersDashborad;