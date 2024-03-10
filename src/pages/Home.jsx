import MainSection from "../Components/MainSection";
import Navbar from "../Components/Navbar";
import Player from "../Components/Player";
import SearchSection from "../Components/SearchSection";

function Home() {
  return (
    <>
      <Navbar />
      <SearchSection />
      <MainSection />
      <Player />
    </>
  );
}

export default Home;
