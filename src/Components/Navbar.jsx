import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MusicContext } from "../Context/MusicContext";
import savan from "/savan-logo.png";
import { data } from "../SingersData/LoginPageData";
// console.log("data: ", data);

function Navbar() {
  const { setSearchedSongs, searchedSongs, isAlbumChange, setIsalbumChange } =
    useContext(MusicContext);
  // console.log("searchedSongs: ", searchedSongs);
  const [search, setSearch] = useState("");

  const handleCloseSuggestion = () => {
    setSearch("");
  };

  const searchSong = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim().length === 0) {
      return;
    }
    try {
      const res = await axios.get(
        `https://saavn.dev/api/search/songs?query=${e.target.value}`
      );
      const { data } = res.data;
      console.log("data: ", data);
      if (data.results.length === 0) {
        setSearchedSongs([]);
      } else {
        setSearchedSongs(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex justify-between items-center py-3 border-none lg:border px-2  fixed top-0 left-0 right-0 bg-[#F6F6F6]">
      {/* 1st div */}
      <div className=" flex flex-col  md:flex-row justify-between items-center mx-auto md:mx-0">
        <div className="flex justify-between items-center gap-2 mr-4">
          {/* <img src={data[2].image} alt="" /> */}
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
      <div className="relative">
        <input
          type="text"
          id="search"
          value={search}
          name="search"
          className=" py-2 rounded-full w-[40vw]  text-center text-black hidden  lg:block outline-none border"
          placeholder="Search for Songs, Artist"
          autoComplete="off"
          onChange={searchSong}
        />
        {search.length > 0 && (
          <span
            onClick={handleCloseSuggestion}
            className=" absolute hidden lg:block right-[10px] top-[9px] cursor-pointer text-2xl text-gray-400"
          >
            <AiOutlineCloseCircle />
          </span>
        )}
        {search.length > 0 && (
          <div
            className="suggestions_div  bg-white  rounded-xl mt-2  absolute  w-[40vw]"
            onClick={() => setIsalbumChange((prev) => !prev)}
          >
            {searchedSongs?.map((singleSong) => (
              <Link key={singleSong.id} to={`/albums/${singleSong.album.id}`}>
                <div className="flex justify-between items-center px-4 h-14 hover:bg-[#99f6e4] hover:rounded-md transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer">
                  <img
                    src={singleSong.image[0].url}
                    className=" h-10 rounded-md  "
                    alt=""
                  />
                  <p>{singleSong.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
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

        <div className="flex text-[15px] gap-2 text-gray-600 font-semibold">
          <Link to={"/login"}>
            <li className="list-none">Log IN</li>
          </Link>
          <Link to={"/signUp"}>
            <li className="list-none"> Sign Up</li>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
