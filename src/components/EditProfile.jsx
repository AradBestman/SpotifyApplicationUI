import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSelector } from "react-redux";
import ROUTES from "../ROUTES";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditProfile = ({ userId }) => {
  console.log("render check edit");
  const userData2 = useSelector((state) => state.authSlice.userData);
  const [userData, setUserData] = useState();

  const [initialFields, setInitialFields] = useState({
    name: "",
    gender: "",
    month: "",
    date: "",
    year: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/users/my-user")
      .then(({ data }) => {
        setUserData(data);
        setInitialFields({
          name: data._doc.name,
          gender: data._doc.gender,
          month: data._doc.month,
          date: data._doc.date,
          year: data._doc.year,
        });
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInitialFields((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:5001/api/v1/users/my-user",

        {
          name: initialFields.name,
          gender: initialFields.gender,
          month: initialFields.month,
          date: initialFields.date,
          year: initialFields.year,
        }
      );
      console.log(data);
      navigate(ROUTES.PROFILE);

      console.log("data from response", data);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        Edit user
      </Typography>{" "}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="given-name"
            name="first"
            fullWidth
            id="name"
            label="Name"
            autoFocus
            value={initialFields.name}
            onChange={handleInputsChange}
            InputProps={{ style: { color: "white" } }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="gender"
            label="Gender"
            id="gender"
            autoComplete="new-alt"
            value={initialFields.gender}
            onChange={handleInputsChange}
            InputProps={{ style: { color: "white" } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="month"
            label="Month"
            id="month"
            autoComplete="new-state"
            value={initialFields.month}
            onChange={handleInputsChange}
            InputProps={{ style: { color: "white" } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="country"
            label="Date"
            id="date"
            autoComplete="new-country"
            value={initialFields.date}
            onChange={handleInputsChange}
            InputProps={{ style: { color: "white" } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="city"
            label="Year"
            id="year"
            autoComplete="new-city"
            value={initialFields.year}
            onChange={handleInputsChange}
            InputProps={{ style: { color: "white" } }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            onClick={handleSaveChanges}
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs onClick={() => navigate(ROUTES.PROFILE)}>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              width: "100%",
              ml: "0%",
              bgcolor: "navy",
              color: "gray",
            }}
          >
            Discard Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfile;
