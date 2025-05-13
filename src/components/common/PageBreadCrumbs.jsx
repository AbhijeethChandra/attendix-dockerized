import React from "react";
import { Box, Typography } from "@mui/material";

export default function PageBreadcrumb({ parentTitle, currentTitle }) {
  return (
    <Box mb={2}>
      <Typography variant="body2" color="text.secondary" component="span">
        {parentTitle} /
      </Typography>{" "}
      <Typography
        variant="body2"
        component="span"
        sx={{ fontWeight: "bold", color: "#0C1220" }}
      >
        {currentTitle}
      </Typography>
    </Box>
  );
}
