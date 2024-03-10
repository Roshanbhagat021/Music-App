import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import { useContext } from "react";
import { MusicContext } from "../Context/MusicContext";
import savan from "/public/savan-logo.png";

function Navbar() {
  const { setSearchedSongs, searchedSongs } = useContext(MusicContext);

  const searchSong = async (e) => {
    if (e.target.value.trim().length === 0) {
      return;
    }
    try {
      const res = await axios.get(
        `https://saavn.dev/search/songs?query=${e.target.value}&page=1&limit=2`
      );
      const { data } = res.data;
      if (data.results.length === 0) {
        setSearchedSongs([]);
      } else {
        setSearchedSongs(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("searchedSongs: ", searchedSongs);

  return (
    <nav className="flex justify-between items-center py-3 border-none lg:border px-2  fixed top-0 left-0 right-0 bg-[#F6F6F6]">
      {/* 1st div */}
      <div className=" flex flex-col  md:flex-row justify-between items-center mx-auto md:mx-0">
        <div className="flex justify-between items-center gap-2 mr-4">
          <Link to="/">
            <img src={savan} alt="" width={37} />
          </Link>
          <Link to="/" className="font-bold text-lg">
            JioSavan
          </Link>
        </div>
        <div className="flex text-[24px] lg:text-[15px] gap-5 text-gray-600 font-semibold h-full  ">
          <li className="list-none">Music</li>
          <li className="list-none">Podcasts</li>
          <li className="list-none">Go Pro</li>
        </div>
      </div>

      {/* 2nd div */}
      <div>
        <input
          type="text"
          id="search"
          name="search"
          className=" py-2 rounded-full w-[40vw]  text-center text-black hidden lg:block outline-none border"
          placeholder="Search for Songs, Artist"
          autoComplete="off"
          onChange={searchSong}
        />
      </div>

      {/* 3rd div */}
      <div className="hidden lg:flex justify-between items-center gap-4">
        <div className="flex justify-center gap-2">
          <div className="flex flex-col text-sm">
            <span className="text-[14px] text-gray-600 font-bold">
              Music Languages
            </span>
            <span className="text-[12px] text-gray-500">Hindi</span>
          </div>

          <MdKeyboardArrowDown className="text-xl text-gray-500 mt-2" />
        </div>

        <div className="flex text-[15px] gap-1 text-gray-600 font-semibold">
          <li className="list-none">Log IN</li>
          <li className="list-none"> Sign Up</li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
