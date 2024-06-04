import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../ROUTES";
import { Avatar, Button, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import nextKey from "generate-my-key";

const Profile = () => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  console.log(userData);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/users/my-user")
      .then(({ data }) => {
        setUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "auto",
        padding: 4,
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        User Profile
      </Typography>
      {user ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt="User Profile"
              sx={{
                width: 150,
                height: 150,
                marginBottom: 2,
              }}
            />
          </Box>
          <Button onClick={() => navigate(`${ROUTES.EDITPROFILE}/:_id`)}>
            EDIT
          </Button>
          <List>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Name: {user._doc.name}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Email : {user._doc.email}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Gender {user._doc.gender}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Month: {user._doc.month}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Date: {user._doc.date}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Year: {user._doc.year}
            </ListItem>
          </List>{" "}
        </Box>
      ) : (
        <Typography variant="body1">No user found</Typography>
      )}
    </Box>
  );
};
export default Profile;
