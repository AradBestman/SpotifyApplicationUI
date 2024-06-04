import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Upload = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [img, setImg] = useState("");
  const [duration, setDuration] = useState("");

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUpdateChangesClick = async () => {
    try {
      const formData = new FormData();

      // Add file to FormData
      formData.append("audioFile", audioFile);

      // Add additional properties to FormData

      console.log(formData, "FormDataaaa");
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/songs",
        formData
      );
      toast("Your song upload successfully 👌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          background: "green",
        },
      });
      console.log("data from response", data);
    } catch (err) {
      console.log(err);
      console.log("err", err.response);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="formUpload"
        encType="multipart/form-data"
      >
        <input
          style={{ color: "white" }}
          type="file"
          name="audioFile"
          onChange={handleFileChange}
        />

        <button type="button" onClick={handleUpdateChangesClick}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
