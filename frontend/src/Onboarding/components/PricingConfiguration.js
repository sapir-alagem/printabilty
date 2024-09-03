import React, { useState, useEffect } from "react";
import paymentsCurrencysMap from "../../currencies";
import Box from "@mui/joy/Box";
import Slider from "@mui/joy/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const PricingConfiguration = ({ formData, handleChange }) => {
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    const codes = paymentsCurrencysMap.map((currency) => currency.abbreviation);

    const currencyData = codes.map((code) => {
      const currency = paymentsCurrencysMap.find(
        (c) => c.abbreviation === code
      );
      return {
        code,
        name: currency ? currency.currency : "",
        symbol: currency ? currency.symbol : "",
      };
    });

    setCurrencyList(currencyData);
  }, []);

  const getCurrencySymbol = (currencyCode) => {
    const currency = paymentsCurrencysMap.find(
      (c) => c.abbreviation === currencyCode
    );
    return currency ? currency.symbol : null;
  };

  const marks = [
    {
      value: 0.05,
      label: "0.05",
    },
    {
      value: 2.0,
      label: "2.00",
    },
  ];

  function valueText(value) {
    return `$${value.toFixed(2)}`;
  }
  const symbol = getCurrencySymbol(formData.paymentsCurrency);

  return (
    <div className="content">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mb: 2,
        }}
      >
        <h3>Pricing Configuration</h3>
        <Box sx={{ width: "100%", mb: 2 }}>
          <label>Payments Currency:</label>
          <Select
            defaultValue={formData.paymentsCurrency}
            labelId="payments-currency-label"
            name="paymentsCurrency"
            value={formData.paymentsCurrency}
            onChange={handleChange}
            required
          >
            {currencyList.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: "100%", mb: 2 }}>
          <div className="form-group" style={{ textAlign: "center" }}>
            <label>Black and White Page Cost:</label>
            <Slider
              name="blackAndWhitePageCost"
              aria-label="Black and White Page Cost"
              value={formData.blackAndWhitePageCost}
              min={0.05}
              max={2.0}
              step={0.01}
              marks={marks}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              onChange={handleChange}
              sx={{ width: 300 }}
            />
          </div>
        </Box>
        <Box sx={{ width: "100%", mb: 2 }}>
          <div className="form-group" style={{ textAlign: "center" }}>
            <label>Colored Page Cost:</label>
            <Slider
              name="coloredPageCost"
              aria-label="Colored Page Cost"
              value={formData.coloredPageCost}
              min={0.05}
              max={2.0}
              step={0.01}
              marks={marks}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              onChange={handleChange}
              sx={{ width: 300 }}
            />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default PricingConfiguration;
