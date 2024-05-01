import React from "react";

import './CompaniesList.css';
import CompanyItem from "./CompanyItem";

const CompaniesList = props => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No companies found.</h2>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Companies List</h2>
                <ul>
                    {props.items.map(company => (
                        <CompanyItem
                            key={company.id}
                            id={company.id}
                            name={company.name}
                            printersCount={company.printersCount}
                        />
                    ))}
                </ul>
            </div>
        );
    }
};

export default CompaniesList;