import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import ROUTES from "../ROUTES";
import { Navigate, useNavigate } from "react-router-dom";

const ErrorPage404 = () => {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography sx={{ color: "white " }} variant="h1">
              404
            </Typography>
            <Typography sx={{ color: "white" }} variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button
              style={{ backgroundColor: "green" }}
              onClick={handleBackHome}
              variant="contained"
            >
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={700}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default ErrorPage404;
