import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { BsStopFill } from "react-icons/bs";
import { BsArrowRepeat } from "react-icons/bs";
import { BsPauseFill } from "react-icons/bs";
import "./AudioControl.css";

const AudioControl = ({
  clickedPlayOrPause,
  clickedStop,
  clickedLoop,
  isPlay,
  isLoop,
  currentTime,
}) => {
  return (
    <div className="buttons">
      <button type="button" onClick={clickedPlayOrPause} className="button">
        {isPlay ? <BsPauseFill size="44px" /> : <BsPlayFill size="44px" />}
      </button>
      <button type="button" onClick={clickedStop} className="button">
        <BsStopFill size="44px" />
      </button>
      <button className="button" type="button" onClick={clickedLoop}>
        {isLoop ? (
          <BsArrowRepeat size="44px" color="blue" />
        ) : (
          <BsArrowRepeat size="44px" />
        )}
      </button>
    </div>
  );
};

export default AudioControl;
