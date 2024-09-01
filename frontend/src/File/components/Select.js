import * as React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function CustomSelect({
  value,
  onChange,
  options,
  label,
  width = 150,
}) {
  return (
    <FormControl sx={{ width }}>
      <InputLabel id="demo-simple-select-label"> {label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": label }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
