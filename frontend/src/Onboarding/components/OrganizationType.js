import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {
  FaBook,
  FaCoffee,
  FaBuilding,
  FaSchool,
  FaDoorOpen,
  FaIndustry,
} from "react-icons/fa";

const OrganizationType = ({ formData, handleChange }) => {
  const options = [
    { label: "Public Library", icon: <FaBook />, value: "Public Library" },
    { label: "Open Space", icon: <FaDoorOpen />, value: "Open Space" },
    { label: "Internet Café", icon: <FaCoffee />, value: "Internet Café" },
    {
      label: "Corporate Office",
      icon: <FaBuilding />,
      value: "Corporate Office",
    },
    {
      label: "Educational Institution",
      icon: <FaSchool />,
      value: "Educational Institution",
    },
    { label: "Other", icon: <FaIndustry />, value: "Other" },
  ];

  const iconColor = "#3799FA";

  return (
    <div className="content">
      <Typography variant="h6" gutterBottom>
        What Type of Organization Are You?
      </Typography>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option.value}>
            <Card
              sx={{
                border:
                  formData.companyType === option.value
                    ? `2px solid ${iconColor}`
                    : "1px solid #ccc",
              }}
            >
              <CardActionArea
                onClick={() =>
                  handleChange({
                    target: { name: "companyType", value: option.value },
                  })
                }
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      marginBottom: "10px",
                      color: iconColor,
                    }}
                  >
                    {option.icon}
                  </div>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: iconColor }}
                  >
                    {option.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrganizationType;
