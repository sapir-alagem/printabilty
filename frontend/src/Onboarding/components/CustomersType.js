import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {
  FaUser,
  FaUserTie,
  FaUserSecret,
  FaUserGraduate,
  FaUsers,
  FaUserAstronaut,
} from "react-icons/fa";

const CustomersType = ({ formData, handleChange }) => {
  const options = [
    { label: "Casual Customers", icon: <FaUser />, value: "Casual Customers" },
    {
      label: "Business Clients",
      icon: <FaUserTie />,
      value: "Business Clients",
    },
    { label: "Tourists", icon: <FaUserSecret />, value: "Tourists" },
    { label: "Students", icon: <FaUserGraduate />, value: "Students" },
    { label: "Local Community", icon: <FaUsers />, value: "Local Community" },
    { label: "Other", icon: <FaUserAstronaut />, value: "Other" },
  ];

  const iconColor = "#3799FA";

  return (
    <div className="content">
      <Typography variant="h6" gutterBottom>
        Who Are Your Customers?
      </Typography>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option.value}>
            <Card
              sx={{
                border:
                  formData.customerType === option.value
                    ? `2px solid ${iconColor}`
                    : "1px solid #ccc",
              }}
            >
              <CardActionArea
                onClick={() =>
                  handleChange({
                    target: { name: "customerType", value: option.value },
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

export default CustomersType;
