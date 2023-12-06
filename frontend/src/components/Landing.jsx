import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", paddingTop: "0px" }}>
      <header style={{ marginBottom: "16px" }}>
        <Typography variant="h1">WealthX10K</Typography>
        <Typography variant="subtitle1">
          Navigate Your Financial Journey, Multiply Your Wealth, Embrace
          WealthX10K
        </Typography>
      </header>

      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
        spacing={4}
      >
        <Grid item xs={12} md={6}>
          <div style={{ maxWidth: "600px", marginRight: "16px" }}>
            <Typography variant="h2">
              Your Savings Journey Begins Here
            </Typography>
            <Typography paragraph>
              Start saving with WealthX10K and achieve your financial goals
              effortlessly. Take control of your finances and ride the wave to
              financial freedom.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "8px" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Get Started
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ maxWidth: "100%" }}>
            <img
              src="https://i.ibb.co/4dL1ZSx/Screenshot-2023-12-05-at-6-14-34-PM.png"
              alt="Financial Freedom"
              style={{ width: "100%" }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
