import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import axios from "axios";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { authActions, useLikedSongs } from "../store/authSlice";
import usePlayer from "../hooks/usePlayer";

const PlaylistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLiked, likedSongs } = useLikedSongs();
  const [playlist, setPlaylist] = useState(undefined);

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
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/v1/playlist/${id}`)
      .then(({ data }) => {
        console.log("Playlist by id", data);
        setPlaylist(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]); // Added id as dependency to rerun effect when id changes

  const handleLikeClick = async (song) => {
    try {
      const data = await axios.patch(
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

  if (playlist === undefined) {
    return <Fragment></Fragment>;
  }

  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage">
            <img src={playlist.img} alt="pic" />
          </div>
          <div className="playlistPageContent">
            <p className="smallText uppercase bold">Playlist</p>
            <h1>{playlist.name}</h1>
            <p className="tagline">{playlist.desc}</p>
            <div className="playlistPageDesc">
              <p className="spotify">Spotify</p>
              <span>699,428 likes</span>
              <span>4hr 35 min</span>
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
            {playlist.songs.map((song, index) => (
              <li key={index}>
                <div className="songIcon">
                  <MusicNoteIcon className="noteI" />
                  <PlayArrowIcon
                    className="playI"
                    onClick={() => {
                      playSong(
                        `http://localhost:5001/${song.path.split("public/")[1]}`
                      );
                    }}
                  />
                  <FavoriteIcon
                    style={{ fill: isLiked(song._id) ? "red" : "white" }}
                    onClick={() => {
                      handleLikeClick(song);
                    }}
                  />
                </div>
                <div className="songDetails">
                  <h3>{song.originalname}</h3>
                  <span>{song.artist}</span>
                </div>
                <div className="songTime">
                  <span>{song.size}</span>
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

export default PlaylistPage;
