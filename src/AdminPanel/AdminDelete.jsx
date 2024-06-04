import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../storageToken/storageToken";
const AdminDelete = ({
  userId = "650ae759db3813a6502fc2fc",
  onDeleteCallback,
  handleDelete,
}) => {
  const [deleteSuccess, setDeleteSuccess] = useState(undefined);
  const deleteUrl = `http://localhost:5001/api/v1/users/${userId}`;

  const onDelete = () => {
    const token = getToken();
    axios
      .delete(deleteUrl)
      .then(() => {
        // Successful deletion
        console.log("LoggYaaa");
        onDeleteCallback(userId);
        setDeleteSuccess(true);
        console.log("Success Delete");
      })

      .catch((err) => {
        console.log("err", err);
      });
    console.log(userId);
  };
  // const onDelete = async () => {
  //   try {
  //     const token = getToken();

  //     await axios.delete(deleteUrl);

  //     onDeleteCallback(userId);
  //     setDeleteSuccess(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Box>
      {deleteSuccess === undefined ? null : deleteSuccess ? (
        <Typography variant="h6">User Deleted Successfully</Typography>
      ) : (
        <Typography variant="h6">Deleting User...</Typography>
      )}
      <button onClick={onDelete}>Click to delete</button>
    </Box>
  );
};

export default AdminDelete;
