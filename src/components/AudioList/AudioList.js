import React, { useState, useEffect, useRef } from "react";
import SingleAudio from "../SingleAudio/SingleAudio";
import AudioControl from "../AudioControl/AudioControl";
import Main from "../../mp3/audio_1.mp3";
import Audio1 from "../../mp3/audio__2.mp3";
import Audio2 from "../../mp3/audio_3.mp3";
import Audio3 from "../../mp3/audio__4.mp3";
import Audio4 from "../../mp3/audio___5.mp3";
import Audio5 from "../../mp3/audio_6.mp3";
import Audio6 from "../../mp3/audio_7.mp3";
import Audio7 from "../../mp3/audio8.mp3";
import Audio8 from "../../mp3/audio9.mp3";
import "./AudioList.css";

export const audioList = [
  { audio: new Audio(Main), background: "#ffff00", title: "Audio1" },
  { audio: new Audio(Audio1), background: "#f0e68c", title: "Audio2" },
  { audio: new Audio(Audio2), background: "#fffacd", title: "Audio3" },
  { audio: new Audio(Audio3), background: "#fffaf0", title: "Audio4" },
  { audio: new Audio(Audio4), background: "#1e90ff", title: "Audio5" },
  { audio: new Audio(Audio5), background: "#00bfff", title: "Audio6" },
  { audio: new Audio(Audio6), background: "#87cefa", title: "Audio7" },
  { audio: new Audio(Audio7), background: "#add8e6", title: "Audio8" },
  { audio: new Audio(Audio8), background: "#e0ffff", title: "Audio9" },
];

function AudioList() {
  const [isPlay, setPlay] = useState(false);
  const [isLoop, setLoop] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const slider = useRef();
  const animationRef = useRef();
  const audioTime = 14;

  //mute specific audio channel
  const muteAudio = (audio) => {
    audio.muted = !audio.muted;
  };

  const setRange = () => {
    audioList.forEach(({ audio }) => {
      audio.currentTime = slider.current.value;
    });
    setCurrentTime(slider.current.value);
  };

  //loop all music when click on loop icon
  const clickedLoop = () => {
    setLoop(!isLoop);
    audioList.forEach(({ audio }) => {
      audio.loop = !audio.loop;
    });
  };

  //click on play or pause icon
  const clickedPlayOrPause = () => {
    if (!isPlay) {
      audioList.forEach(({ audio }) => {
        audio.play();
        animationRef.current = requestAnimationFrame(playCurrentTime);
      });
    } else {
      audioList.forEach(({ audio }) => {
        audio.pause();
        cancelAnimationFrame(animationRef.current);
      });
    }
    setPlay(!isPlay);
  };

  //stop the music and start over the music
  const clickedStop = () => {
    setPlay(false);
    setCurrentTime(0);
    audioList.forEach(({ audio }) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };
  const trackDuration = Math.floor(audioList[0].audio.duration);

  useEffect(() => {
    const trackTime = trackDuration;
    setDuration(trackTime);
    slider.current.max = trackTime;
  }, [trackDuration]);

  useEffect(() => {
    if (currentTime === 14 && audioList[0].audio.loop === false) {
      setPlay(false);
    }
  }, [currentTime, isLoop]);

  const playCurrentTime = () => {
    slider.current.value = audioList[0].audio.currentTime;
    setCurrentTime(slider.current.value);
    animationRef.current = requestAnimationFrame(playCurrentTime);
  };

  const displayCurrentTime = (time) => {
    const sec = Math.floor(time % 60);
    if (sec < 10) {
      return `0:0${sec}`;
    } else {
      return `0:${sec}`;
    }
  };

  return (
    <div className="audiolist-container">
      <span className="title">Loop Machine</span>
      <div className="progressbarAndItems">
        <input
          className="progressbar"
          onChange={setRange}
          type="range"
          min="0"
          max={audioTime}
          defaultValue="0"
          ref={slider}
        />
        <ul className="audioListwrapper">
          {audioList.map((audio, id) => (
            <li className="audioitem" key={id}>
              <SingleAudio audio={audio} muteAudio={muteAudio} />
            </li>
          ))}
        </ul>
      </div>
      <div className="time-section">
        <span className="time">{displayCurrentTime(currentTime)}</span>
        <span className="time"> /00:13</span>
      </div>
      <AudioControl
        isLoop={isLoop}
        isPlay={isPlay}
        currentTime={currentTime}
        trackDuration={duration}
        clickedPlayOrPause={clickedPlayOrPause}
        clickedStop={clickedStop}
        clickedLoop={clickedLoop}
      />
    </div>
  );
}

export default AudioList;
