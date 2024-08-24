import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({ min, max, start, end, onRangeChange }) {
  const [value, setValue] = React.useState([start, end]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    if (onRangeChange) {
      onRangeChange({ start: newValue[0], end: newValue[1] });
    }
  };

  return (
    <Box sx={{ width: 150, display: "flex", justifyContent: "flex-start" }}>
      <Box sx={{ width: "calc(100% - 16px)", marginLeft: "16px" }}>
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </Box>
  );
}
