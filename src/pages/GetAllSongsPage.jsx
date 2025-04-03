import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import axios from "axios";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { authActions, useLikedSongs } from "../store/authSlice";
import usePlayer from "../hooks/usePlayer";

const GetAllSongsPage = () => {
  let { id } = useParams();
  const [songs, setSongs] = useState(null);
  const dispatch = useDispatch();
  const { likedSongs, isLiked } = useLikedSongs();

  // Use the custom usePlayer hook
  const {
    playingSong,
    playerRef,
    playSong,
    playing,
    handleProgress,
    handlePause,
    handleEnded,
  } = usePlayer();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/v1/songs")
      .then(({ data }) => {
        setSongs(data);
        console.log(data);
      })

      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleLikeClick = async (song) => {
    try {
      const { data } = await axios.patch(
        "http://localhost:5001/api/v1/songs/like",
        { song_id: song._id }
      );
      if (isLiked(song._id)) {
        dispatch(
          authActions.setLikedSongs(
            likedSongs.filter((s) => s._id !== song._id)
          )
        );
      } else {
        dispatch(authActions.setLikedSongs([...likedSongs, song]));
      }
    } catch (err) {
      console.log("like err", err);
    }
  };

  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageContent">
            <p className="smallText uppercase bold">Playlist</p>
            <h1>A Perfect Day</h1>
            <p className="tagline">
              Minimalism, electronica and modern classical to concentrate to.
            </p>
            <div className="playlistPageDesc">
              <p className="spotify">Spotify</p>
              <span>699,428 likes</span>
              <span>4hr 35 min</span>
            </div>
          </div>
          <div className="playlistPageImage">
            <img
              src="https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80"
              alt="pic"
            />
          </div>
        </div>
        <div className="playlistPageSongs">
          {songs && likedSongs && (
            <ul className="songList">
              {songs.map((song, index) => (
                <li key={index}>
                  <div className="songIcon">
                    <MusicNoteIcon className="noteI" />
                    <PlayArrowIcon
                      className="playI"
                      onClick={() =>
                        playSong(
                          `http://localhost:5001/${
                            song.path.split("public/")[1]
                          }`
                        )
                      }
                    />
                    <FavoriteIcon
                      style={{ fill: isLiked(song._id) ? "red" : "white" }}
                      onClick={() => handleLikeClick(song)}
                    />
                  </div>

                  <div className="songDetails">
                    <h3>{song.originalname}</h3>
                    <span>{song.artist}</span>
                  </div>

                  <div className="songTime">
                    <span>{song.duration}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {playingSong && (
            <ReactPlayer
              ref={playerRef}
              style={{ opacity: 0 }}
              url={playingSong}
              controls
              playing={playing}
              onProgress={handleProgress}
              onEnded={handleEnded}
              onPause={handlePause}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAllSongsPage;
