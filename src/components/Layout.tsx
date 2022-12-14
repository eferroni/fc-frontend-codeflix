import { Box, Container } from "@mui/material";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, color: "white" }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
