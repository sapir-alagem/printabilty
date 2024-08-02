import React from 'react';

const PrinterGenerateButton = ({ onGenerate }) => {
    return (
        <button onClick={onGenerate} className="btn btn-primary m-4">
            Add Printer
        </button>
    );
};

export default PrinterGenerateButton;
