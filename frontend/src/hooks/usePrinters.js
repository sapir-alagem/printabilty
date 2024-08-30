import { useState, useEffect } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const usePrinters = (companyId) => {
    const [printers, setPrinters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate();
  
    useEffect(() => {
      const fetchPrinters = async () => {
        try {
          const response = await axiosPrivate.get(`/companies/${companyId}/printers`);
          const printersData = response.data;
  
          for (let printer of printersData) {
            const qrResponse = await axiosPrivate.get(`/companies/${companyId}/printers/${printer._id}/qrcodes`);
            printer.qrCodes = qrResponse.data;
          }
  
          setPrinters(printersData);
        } catch (error) {
          setError("Error fetching printers");
          setPrinters([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPrinters();
    }, [companyId, axiosPrivate]);
  
    return { printers, loading, error };
  };
  
  export default usePrinters;
  