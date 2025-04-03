// src/hooks/usePlayer.js
import { useState, useRef } from "react";

const usePlayer = () => {
  const [playingSong, setPlayingSong] = useState(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);

  const playSong = (url) => {
    if (playingSong === url) {
      // Toggle play/pause for the same song
      setPlaying(!playing);
    } else {
      // Play a new song
      setPlayingSong(url);
      setPlaying(true);
      setPlaybackPosition(0); // Reset the position when a new song starts
    }
  };

  const handleProgress = ({ playedSeconds }) => {
    setPlaybackPosition(playedSeconds);
  };

  const handlePause = () => {
    const currentTime = playerRef.current.getCurrentTime();
    setPlaybackPosition(currentTime);
    setPlaying(false);
  };

  const handleEnded = () => {
    setPlayingSong(null);
    setPlaying(false);
  };

  return {
    playingSong,
    playerRef,
    playSong,
    playing,
    playbackPosition,
    setPlaybackPosition,
    handleProgress,
    handlePause,
    handleEnded,
  };
};

export default usePlayer;
