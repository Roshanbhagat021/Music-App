import { useContext } from "react";
import { MusicContext } from "../Context/MusicContext";
import SongItems from "./SongItems";

const SearchSection = () => {
  const { searchedSongs } = useContext(MusicContext);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center flex-wrap gap-4 bg-white bg-opacity-50 backdrop-blur-lg ${
        searchedSongs.length === 0
          ? "-translate-y-[1200px]"
          : "translate-y-0 transition-all duration-500 ease-linear"
      }`}
    >
      {searchedSongs?.map((song) => (
        <SongItems key={song.id} {...song} />
      ))}
    </div>
  );
};

export default SearchSection;
