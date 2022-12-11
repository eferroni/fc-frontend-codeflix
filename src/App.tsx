import Header from "./components/Header";
import Layout from "./components/Layout";
import { appTheme } from "./config/theme";
import { Routes, Route } from "react-router-dom";
import ListCategory from "../src/features/categories/ListCategory";
import CreateCategory from "./features/categories/CreateCategory";
import EditCategory from "./features/categories/EditCategory";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<ListCategory />} />
              <Route path="/categories" element={<ListCategory />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              <Route
                path="*"
                element={
                  <Box sx={{ color: "white" }}>
                    <Typography>404</Typography>
                  </Box>
                }
              />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
