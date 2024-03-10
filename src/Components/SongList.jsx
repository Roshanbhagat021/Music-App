import { useContext, useState } from "react";
import { GoPlay } from "react-icons/go";
import { MusicContext } from "../Context/MusicContext";
import he from "he";
const SongList = ({
  name,
  artists,
  duration,
  downloadUrl,
  image,
  id,
  serialNo,
}) => {
  const secToDurationConverter = (duration) => {
    const min = Math.floor(duration / 60);
    const sec = String(duration % 60).padStart(2, 0);
    return `${min}:${sec}`;
  };
  const Artists = artists.primary.map((artist) => artist.name).join(",");

  const { isPlaying, currentSong, PlayMusic } = useContext(MusicContext);

  return (
    <div className=" flex justify-between items-center gap-3  w-[95vw] p-1 px-3 hover:bg-white hover:shadow-md lg:w-[70vw] mx-auto">
      <GoPlay
        className="text-3xl cursor-pointer text-gray-500 hover:text-gray-700  transition-all ease-in-out duration-300"
        onClick={() =>
          PlayMusic(downloadUrl, id, name, duration, image, Artists)
        }
      />
      <div className="flex flex-col lg:flex-row   gap-1 justify-between items-start w-[90%]">
        <span
          className={`font-bold text-xs ${
            id === currentSong?.id && "text-[#1ECCB0]"
          }`}
        >
          {name.replace(/&quot;/g, '"')}
        </span>
        <span className="font-thin  w-[60%] text-gray-500 text-xs">
          {Artists}
        </span>
      </div>
      <div>
        <span className=" text-gray-500 font-thin hidden lg:block text-xs">
          {secToDurationConverter(duration)}
        </span>
      </div>
    </div>
  );
};

export default SongList;
