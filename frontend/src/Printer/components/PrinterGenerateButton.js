import React from 'react';

const PrinterGenerateButton = ({ onGenerate }) => {
    return (
        <button onClick={onGenerate} className="btn btn-sm btn-primary">
            Add Printer
        </button>
    );
};

export default PrinterGenerateButton;
