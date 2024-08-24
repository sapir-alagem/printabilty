import React, { useState, useEffect } from "react";
import axios from "axios";
import currencyCodes from "currency-codes";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    paymentsCurrency: "ILS",
    blackAndWhitePageCost: "",
    enableColorPrinting: false,
    coloredPageCost: "",
    pageLimit: "",
    numOfPrinters: "",
    printerNames: [],
  });

  const [currencies, setCurrencies] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name.startsWith("printerName")) {
      const index = parseInt(name.split("-")[1], 10);
      const newPrinterNames = [...formData.printerNames];
      newPrinterNames[index] = value;
      setFormData({ ...formData, printerNames: newPrinterNames });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://openexchangerates.org/api/currencies.json"
        );
        const currencyList = Object.entries(response.data).map(
          ([code, name]) => ({ code, name })
        );
        setCurrencies(currencyList);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/companies",
        formData
      );
      console.log(response.data); // just for check

      const params = new URLSearchParams();
      params.append("companyEmail", formData.companyEmail);
      params.append("companyName", formData.companyName);

      // Navigate with the constructed query string
      navigate(`/companies/new/success?${params.toString()}`);
    } catch (error) {
      console.error(error); // just for check
    }
  };

  useEffect(() => {
    const numOfPrinters = parseInt(formData.numOfPrinters, 10);
    if (!isNaN(numOfPrinters) && numOfPrinters > 0) {
      const newPrinterNames = Array(numOfPrinters).fill("");
      setFormData({ ...formData, printerNames: newPrinterNames });
    } else {
      setFormData({ ...formData, printerNames: [] });
    }
  }, [formData.numOfPrinters]);

  return (
    <div className="main-w3layouts wrapper">
      <h1>Creative SignUp Form</h1>
      <div className="main-agileinfo">
        <div className="agileits-top">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company Name:</label>
              <input
                className="text"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company Email:</label>
              <input
                className="text"
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Payments Currency:</label>
              <select
                name="paymentsCurrency"
                value={formData.paymentsCurrency}
                onChange={handleChange}
                required
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Black And White Page Cost:</label>
              <input
                className="text"
                type="number"
                name="blackAndWhitePageCost"
                value={formData.blackAndWhitePageCost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Enable Color Printing:</label>
              <input
                type="checkbox"
                name="enableColorPrinting"
                checked={formData.enableColorPrinting}
                onChange={handleChange}
              />
            </div>
            {formData.enableColorPrinting && (
              <div className="form-group">
                <label>Colored Page Cost:</label>
                <input
                  className="text"
                  type="number"
                  name="coloredPageCost"
                  value={formData.coloredPageCost}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label>Page Limit (per Print Job):</label>
              <input
                className="text"
                type="number"
                name="pageLimit"
                value={formData.pageLimit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Number Of Printers:</label>
              <input
                className="text"
                type="number"
                name="numOfPrinters"
                value={formData.numOfPrinters}
                onChange={handleChange}
              />
            </div>
            {formData.printerNames.map((_, index) => (
              <div key={index} className="form-group">
                <label>Printer #{index + 1} Name:</label>
                <input
                  className="text"
                  type="text"
                  name={`printerName-${index}`}
                  value={formData.printerNames[index]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
