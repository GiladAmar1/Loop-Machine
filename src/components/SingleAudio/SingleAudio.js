import React, { useState } from "react";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import "./SingleAudio.css";

const SingleAudio = ({ audio, muteAudio }) => {
  const [isMute, setIsMute] = useState(false);
  
  const toggleMute = () => {
    setIsMute(!isMute);
    muteAudio(audio.audio);
  };

  return (
    <div className="singleaudio">
      <div
        className="singleAdioContainer"
        style={{ backgroundColor: audio.background }}
      >
        <div className="singleaudioWrapper">
          <button type="button" className="mute" onClick={toggleMute}>
            {isMute ? <BsToggleOn size={40} /> : <BsToggleOff size={40} />}
          </button>
          <p className="audioTitle">{audio.title}</p>
        </div>
        <audio src={audio.audio} loop preload="metadata" type="mp3"></audio>
      </div>
    </div>
  );
};

export default SingleAudio;
