import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fileUrl = queryParams.get('file_url');
    const numPages = queryParams.get('numPages');
    const colorMode = queryParams.get('color_mode');
    const printBothSides = queryParams.get('print_both_sides') === 'true';
    const layoutMode = queryParams.get('layout_mode');
    const printAllPages = queryParams.get('print_all_pages') === 'true';
    const startPage = parseInt(queryParams.get('start_page'));
    const endPage = parseInt(queryParams.get('end_page'));
    const copies = parseInt(queryParams.get('copies'));

    const sendPrintJob = async () => {
      try {
        const response = await fetch('http://localhost:5000/print_jobs/send_print_job', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file_url: fileUrl,
            numPages: numPages,
            color_mode: colorMode,
            layout_mode: layoutMode,
            print_both_sides: printBothSides,
            print_all_pages: printAllPages,
            page_range_start: startPage,
            page_range_end: endPage,
            copies: copies,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log('Print job sent successfully:', await response.json());
      } catch (error) {
        console.error('Error sending print job request:', error);
      }
    };

    sendPrintJob();
  }, [location.search]);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Payment Successful</h1>
        <p className="lead">Thank you for your payment. Your transaction was successful</p>
        <Link to="/" className="btn btn-success mt-3">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
