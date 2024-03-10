import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AlbumItem from "./AlbumItem";
import Slider from "./Slider";

const MainSection = () => {
  const [albums, setAlbums] = useState([]);
  const [trending, setTrending] = useState([]);

  async function getHomePageData() {
    try {
      const res = await axios(`https://saavn.dev/modules?language=hindi`);
      const { data } = res.data;
      console.log("data: ", data);
      setAlbums(data.albums);
      setTrending(data.trending);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHomePageData();
  }, []);

  const trendingAlbum = useMemo(
    () => (Array.isArray(trending.albums) ? trending.albums : []),
    [trending.albums]
  );

  return (
    <>
      <section className="my-20">
        <h2 className="text-xl px-5 py-3 font-semibold text-gray-700  w-full  lg:w-[78vw] mx-auto ">
          Trending
        </h2>
        <Slider data={trendingAlbum} />
        <h2 className="text-xl px-5 py-3 font-semibold text-gray-700  w-full  lg:w-[78vw] mx-auto ">
          New Releases
        </h2>
        <Slider data={albums} />
      </section>
    </>
  );
};

export default MainSection;
