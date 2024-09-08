import React, { useState, useEffect } from "react";
import paymentsCurrencysMap from "../../currencies";
import Box from "@mui/joy/Box";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

const PricingConfiguration = ({ formData, handleChange }) => {
  const [currencyList, setCurrencyList] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("");

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
    const defaultCurrency = currencyData.find(
      (currency) => currency.code === formData.paymentsCurrency
    );
    if (defaultCurrency) {
      setCurrencySymbol(defaultCurrency.symbol);
    }
  }, [formData.paymentsCurrency]);

  const getCurrencySymbol = (currencyCode) => {
    const currency = paymentsCurrencysMap.find(
      (c) => c.abbreviation === currencyCode
    );
    return currency ? currency.symbol : "";
  };

  const marks = [
    {
      value: 0.05,
      label: `0.05 ${currencySymbol}`,
    },
    {
      value: 2.0,
      label: `2.00 ${currencySymbol}`,
    },
  ];

  function valueText(value) {
    return `${currencySymbol}${value.toFixed(2)}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: 2,
      }}
    >
      <Box sx={{ width: "70%", mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Set Your Pricing Details
        </Typography>
        <FormControl fullWidth>
          <Typography variant="h6" gutterBottom>
            Payments Currency
          </Typography>
          <Select
            labelId="payments-currency-label"
            name="paymentsCurrency"
            value={formData.paymentsCurrency}
            onChange={(e) => {
              handleChange(e);
              setCurrencySymbol(getCurrencySymbol(e.target.value));
            }}
            required
            sx={{ backgroundColor: "#f5f5f5" }}
          >
            {currencyList.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "100%", mb: 2 }}>
        <Typography variant="h6" gutterBottom align="center">
          Black and White Page Cost
        </Typography>
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
          sx={{ width: "80%", mx: "auto" }}
        />
      </Box>
      <Box sx={{ width: "100%", mb: 2 }}>
        <Typography variant="h6" gutterBottom align="center">
          Colored Page Cost
        </Typography>
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
          sx={{ width: "80%", mx: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default PricingConfiguration;
