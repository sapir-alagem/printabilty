import React from "react";

import './CompanyItem.css';

const CompanyItem = props => {
    return (
        <li className="company-item">
            <div className="company-item__content">
                <div className="company-item__info">
                    <h2>{props.name}</h2>
                    <h3>
                        {props.printersCount} {props.printersCount === 1 ? "Printer" : "Printers"}
                    </h3>
                </div>
            </div>
        </li>
    )
};

export default CompanyItem;