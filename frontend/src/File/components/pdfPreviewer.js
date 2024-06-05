import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfPreview = ({ pdfUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        setInitialTab: () => Promise.resolve(0),
    });
    
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          //plugins={[defaultLayoutPluginInstance]}
          fileUrl={pdfUrl}
        />
      </Worker>
    </div>
  );
};

export default PdfPreview;
