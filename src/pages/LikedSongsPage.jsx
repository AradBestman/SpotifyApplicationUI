import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player"; // Added import for ReactPlayer
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { authActions, useLikedSongs } from "../store/authSlice";
import { FavoriteBorder } from "@mui/icons-material";
import usePlayer from "../hooks/usePlayer";
import { useParams } from "react-router-dom";

const LikedSongsPage = () => {
  const { id } = useParams();
  const { likedSongs } = useLikedSongs();
  const dispatch = useDispatch();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  console.log(userData);

  const {
    playingSong,
    playerRef,
    playSong,
    playing,
    playbackPosition,
    setPlaybackPosition,
    handleProgress,
    handlePause,
    handleEnded,
  } = usePlayer();

  const convertToSeconds = (duration) => {
    const [minutes, seconds] = duration.toString().split(".").map(Number);
    return (minutes || 0) * 60 + (seconds || 0);
  };
  const handleLikeClick = async (song_id) => {
    dispatch(
      authActions.setLikedSongs(likedSongs.filter((s) => s._id !== song_id))
    );
  };
  console.log(likedSongs, "This is log of the likedSOngs");
  const totalLikedSongs = likedSongs.length;
  const formatDuration = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Format the total duration for display
  const totalDurationInSeconds = likedSongs.reduce(
    (acc, song) => acc + convertToSeconds(song.duration),
    0
  );

  // Format the total duration for display in mm:ss
  const formattedTotalDuration = formatDuration(totalDurationInSeconds);
  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage">
            <FavoriteBorder sx={{ width: 250, height: 250 }} />
          </div>
          <div className="playlistPageContent">
            <p className="smallText uppercase bold">Liked Songs Playlist</p>
            <h1>Your Likes</h1>

            <p className="tagline">
              Minimalism, electronica and modern classical to concentrate to.
            </p>
            <div className="playlistPageDesc">
              <p className="spotify">Spotify</p>
              <span>{totalLikedSongs}</span>
              <span>{formattedTotalDuration}</span>
            </div>
          </div>
        </div>
        <div className="playlistPageSongs">
          <div className="playlistButtons">
            <span className="playIcon">
              <PlayArrowIcon />
            </span>
            <div className="icons">
              <div className="icon iconsHeart">
                <FavoriteIcon />
              </div>
              <div className="icon iconsDots"></div>
            </div>
          </div>

          <ul className="songList">
            {likedSongs.map((likedSong, index) => (
              <li key={index}>
                <div className="songIcon">
                  <MusicNoteIcon className="noteI" />
                  <PlayArrowIcon
                    className="playI"
                    onClick={() => {
                      playSong(
                        `http://localhost:5001/${
                          likedSong.path.split("public/")[1]
                        }`
                      );
                    }}
                  />
                  <FavoriteIcon
                    style={{ fill: "red" }}
                    onClick={() => {
                      handleLikeClick(likedSong._id);
                    }}
                  />
                </div>
                <div className="songDetails">
                  <h3>{likedSong.originalname}</h3>
                  <span>{likedSong.artist}</span>
                </div>
                <div className="songTime">
                  <span>{likedSong.duration}</span>
                </div>
              </li>
            ))}
          </ul>

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

export default LikedSongsPage;
