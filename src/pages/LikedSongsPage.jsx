import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player"; // Added import for ReactPlayer
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { authActions, useLikedSongs } from "../store/authSlice";

const LikedSongsPage = () => {
  const { likedSongs } = useLikedSongs();
  const dispatch = useDispatch();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  console.log(userData);
  const [playingSong, setPlayingSong] = useState(null);
  const [playing, setPlaying] = useState(false);

  const handleLikeClick = async (song_id) => {
    dispatch(
      authActions.setLikedSongs(likedSongs.filter((s) => s._id !== song_id))
    );
  };

  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage">
            <img
              src="https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80"
              alt="pic"
            />
          </div>
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
                      if (likedSong.path) {
                        const url = `http://localhost:5001/${
                          likedSong.path.split("public/")[1]
                        }`;
                        likedSong.path.split();
                        console.log(likedSong.path.split("public/")[1]);
                        if (playingSong === url) {
                          setPlayingSong(undefined);
                        } else {
                          setPlayingSong(url);
                        }
                      }
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
                  <span>{likedSong.size}</span>
                </div>
              </li>
            ))}
          </ul>

          {playingSong && (
            <ReactPlayer
              style={{ opacity: 0 }}
              url={playingSong}
              controls
              playing
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedSongsPage;
