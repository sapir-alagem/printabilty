import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const BankingForm = ({ formData, handleChange }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Enter Your Banking Information
      </Typography>
      <form style={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Bank Name"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Account Number"
          name="accountNumber"
          type="number"
          value={formData.accountNumber}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Billing Address"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
          margin="normal"
          required
        />
      </form>
    </div>
  );
};

export default BankingForm;
