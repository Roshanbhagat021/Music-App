import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MusicContext } from "../Context/MusicContext";
import Navbar from "../Components/Navbar";
import Player from "../Components/Player";
import { CiHeart } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import SongList from "../Components/SongList";
import SearchSection from "../Components/SearchSection";

function AlbumDetails() {
  const {
    setSongs,
    songs,
    currentSong,
    PlayMusic,
    setIsalbumChange,
    searchedSongs,
    isAlbumChange,
  } = useContext(MusicContext);
  // console.log("songs: ", songs);
  const [album, setAlbum] = useState([]);
  const [image, setImage] = useState([]);
  const [singers, setSingers] = useState([]);
  const [copyright, setCopyRight] = useState("");

  const { id } = useParams();
  // console.log("id: ", id);
  // console.log("isAlbumChange:", isAlbumChange);

  const getAlbumDetails = async () => {
    const res = await axios.get(`https://saavn.dev/api/albums?id=${id}`);
    const { data } = await res.data;
    // console.log("data: ", data);
    setAlbum(data);
    setSingers(data.artists.primary);
    setSongs(data.songs);
    setCopyRight(data.songs[0].copyright);
    setImage(data.image[2].url);
  };

  useEffect(() => {
    getAlbumDetails();
  }, [isAlbumChange]);

  let totalsec = songs.reduce((time, curren) => {
    return Number(time) + Number(curren.duration);
  }, 0);

  function calculateDuration(totalsec) {
    if (totalsec > 3600) {
      let hr = Math.floor(totalsec / 3600);
      let min = Math.floor(totalsec / 60 - 60 * hr);
      let sec = totalsec % 60;
      return `${hr}:${min}:${sec}`;
    } else {
      let min = Math.floor(totalsec / 60);
      let sec = totalsec % 60;
      return `${min}:${sec}`;
    }
  }

  let duration = calculateDuration(totalsec);

  // Total play counts
  let TotalPlayCount = songs
    .reduce(
      (playcount, current) => Number(playcount) + Number(current.playCount),
      0
    )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <Navbar />
      {/* <SearchSection /> */}
      <div>
        <div className="flex  flex-col lg:flex-row  gap-8 items-center text-center lg:text-left w-[70vw] mt-20 mx-auto">
          <img src={image} alt="" className="rounded-md w-[250px]" />

          <div className="w=[250px]  text-gray-800">
            <h1 className="lg:text-4xl  text-2xl my-2 font-medium text-black">
              {album.name?.replace(/&quot;/g, '"')}
            </h1>
            <p className="font-thin">
              by {singers?.map((singer) => singer.name)} .{" "}
              {album.songCount === 1
                ? album.songCount + " " + "Song"
                : album.songCount + " " + "Songs"}{" "}
              . {`${TotalPlayCount} Plays`} . {`${duration}`}
            </p>
            <p className="my-1 font-thin">{copyright}</p>
            <div className="flex items-center mt-2 gap-3">
              <button
                className="w-32 text-2xl hover:bg-[#258F83] transition-all duration-300  h-14 rounded-full text-white bg-[#1ECCB0]"
                onClick={() =>
                  PlayMusic(
                    currentSong.audio,
                    currentSong.id,
                    currentSong.name,
                    currentSong.duration,
                    currentSong.image,
                    currentSong.primaryArtists
                  )
                }
              >
                Play
              </button>
              <CiHeart className="border text-5xl p-1 rounded-full  transition-all duration-500 text-gray-500 hover:border-black cursor-pointer" />
              <BsThreeDots className="border text-5xl p-1 rounded-full  transition-all duration-500 text-gray-500 hover:border-black cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          {songs?.map((song, index) => (
            <SongList key={song.id} serialNo={index + 1} {...song} />
          ))}
        </div>
      </div>
      <Player />
    </>
  );
}

export default AlbumDetails;
