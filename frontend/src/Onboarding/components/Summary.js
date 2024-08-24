import React from 'react';

const Summary = ({formData}) => {
    return (
        <div className="content">
            <h2>Registration Successful!</h2>
            <p>A guide with a download link has been sent to your email:{formData.companyMail}</p>
            <p>After installation, return here</p>
            <p>to access your dashboard and start setting up your printers network.</p>
        </div>
    );
};

export default Summary;
