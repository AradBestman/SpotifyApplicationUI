import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";
import { getToken } from "../storageToken/storageToken";

import { DataGrid } from "@mui/x-data-grid";
import AdminDelete from "./AdminDelete";

const GetAllUsers = () => {
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/users/")
      .then(({ data }) => {
        setDataFromServer(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);

  const handleDelete = (deletedUserId) => {
    console.log(deletedUserId);
    setDataFromServer(
      dataFromServer.filter((user) => user._id !== deletedUserId)
    );
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "FirstName",
      width: 150,
      valueGetter: (params) => params.row.name,
    },

    {
      field: "Email",
      headerName: "Email",
      width: 175,
      valueGetter: (params) => params.row.email,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <AdminDelete userId={params.row._id} onDeleteCallback={handleDelete} />
      ),
    },
  ];

  return (
    <Box>
      <DataGrid
        sx={{ color: "white", backgroundColor: "green" }}
        getRowId={(row) => row._id}
        rows={dataFromServer}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  );
};

export default GetAllUsers;
