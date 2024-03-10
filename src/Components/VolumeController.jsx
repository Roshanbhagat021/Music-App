import { useContext, useState } from "react";
import { MusicContext } from "../Context/MusicContext";

const VolumeController = ({ isVolumeBarVisible ,volume,setVolume }) => {
  const { currentSong } = useContext(MusicContext);
  

  const handleVolumeChange = (e) => {
    if (currentSong) {
      const newVol = parseFloat(e.target.value) / 100;
      currentSong.audio.volume = newVol;
      setVolume(newVol);
      console.log('newVol: ', newVol);
    }
  };

  return (
    <div
      className={`w-[80px] absolute -right-3 bottom-16 px-2 shadow-md -rotate-90 rounded-lg bg-white ${
        isVolumeBarVisible ? " " : "hidden"
      }`}
    >
      <input
        type="range"
        name="volume-bar"
        id="volume-bar"
        min={0}
        max={100}
        alue={volume}
        step="0.1"
        className="h-[5px]  text-green-400 progress_bar "
        onChange={(e)=>handleVolumeChange(e)}
      />
    </div>
  );
};

export default VolumeController;
