import React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import logo from "../../assets/AssetPro_logo.svg";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <img
          src={logo}
          alt="AssetPro Logo"
          style={{
            maxWidth: "80%",
            height: "auto",
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
