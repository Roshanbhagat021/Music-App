import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { LuHardDriveDownload } from "react-icons/lu";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaVolumeMute } from "react-icons/fa";
import { PiSpeakerLowFill } from "react-icons/pi";
import VolumeController from "./VolumeController";
import { useContext, useEffect, useRef, useState } from "react";
import { MusicContext } from "../Context/MusicContext";
const Player = () => {
  const [isVolumeBarVisible, setIsVolumeBarVisible] = useState(false);
  const [volume, setVolume] = useState(50);

  const { nextSong, prevSong, currentSong, isPlaying, PlayMusic, songs } =
    useContext(MusicContext);

  const sliderRef = useRef();
  // console.log("sliderRef: ", sliderRef.current);

  const handleDownload = async (url) => {
    try {
      const res = await fetch(url);
      const b = await res.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(b);
      downloadLink.download = `${currentSong.name}.mp3`;

      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log("Error while Downloading song", error);
    }
  };

  useEffect(() => {
    if (currentSong) {
      const audioElement = currentSong.audio;

      function handleTimeUpdate() {
        const duration = Number(currentSong.duration);
        const currTime = audioElement.currentTime;
        const newTimeing = (currTime / duration) * 100;
        sliderRef.current.value = newTimeing;
      }

      function handleSongEnd() {
        nextSong();
      }
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", handleSongEnd);
      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.addEventListener("ended", handleSongEnd);
      };
    }
  }, [currentSong]);

  // console.log("currentSong.audio", currentSong.audio);

  function handleProgressChange(e) {
    const newPersentage = parseFloat(e.target.value);
    const newTime = (newPersentage / 100) * Number(currentSong.duration);
    currentSong.audio.currentTime = newTime;
  }

  function handlePauseAndPlay() {
    PlayMusic(
      currentSong.audio,
      currentSong.id,
      currentSong.name,
      currentSong.duration,
      currentSong.image,
      currentSong.primaryArtists
    );
  }

  const SpeakerIconStyling = ` text-2.5xl
  lg:text-3xl
  text-gray-700
  hover:text-gray-500
  cursor-pointer
  hidden lg:block`;

  return (
    <div className="fixed  left-0 bottom-0 right-0 flex flex-col bg-[#f5f5f5ff]">
      <input
        type="range"
        name="progress-bar"
        id="progress-bar"
        min={0}
        max={100}
        value={0}
        ref={sliderRef}
        step="0.1"
        onChange={handleProgressChange}
        className="w-full h-[5px] progress_bar"
      />

      <div className=" flex justify-between items-center mb-3 px-2">
        <div className="flex justify-start gap-3 lg:w-[30vw]">
          <img
            src={`${currentSong?.image}`}
            draggable="false"
            alt=""
            width={55}
            className="rounded-lg"
          />
          <div className="hidden lg:block">
            <span>{currentSong?.name.replace(/&quot;/g, '"')}</span>
            <p className="text-xs text-gray-500">
              {currentSong?.primaryArtists}
            </p>
          </div>
        </div>

        <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
          <BiRepeat className="text-gray-400 cursor-pointer" />
          <IoMdSkipBackward
            onClick={() => prevSong()}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          />

          {isPlaying ? (
            <FaPause
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() => handlePauseAndPlay()}
            />
          ) : (
            <FaPlay
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() => handlePauseAndPlay()}
            />
          )}

          <IoMdSkipForward
            onClick={() => nextSong()}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          />
          <PiShuffleBold className="text-gray-400 cursor-pointer" />
        </div>

        <div
          className="flex justify-end lg:w-[30vw] items-center"
          onMouseEnter={() => setIsVolumeBarVisible(true)}
          onMouseLeave={() => setIsVolumeBarVisible(false)}
        >
          <LuHardDriveDownload
            className="text-2xl lg:text-3xl text-gray-700 hover:text-gray-500 cursor-pointer lg:mr-2"
            onClick={() => handleDownload(currentSong.audio.src)}
          />

          {volume === 0 ? (
            <FaVolumeMute
            className={` ${SpeakerIconStyling}`}
            />
          ) : volume < 0.5 ? (
            <PiSpeakerLowFill
            className={` ${SpeakerIconStyling}`}
            />
          ) : (
            <HiSpeakerWave
              className={` ${SpeakerIconStyling}`}
            />
          )}

          <VolumeController
            isVolumeBarVisible={isVolumeBarVisible}
            setVolume={setVolume}
            volume={volume}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
