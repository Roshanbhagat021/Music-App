import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AlbumItem from "./AlbumItem";
import Slider from "./Slider";

const MainSection = () => {
  const [data, setData] = useState([]);
  // console.log("data: ", data);
  const [trending, setTrending] = useState([]);

  async function getHomePageData() {
    try {
      const res = await axios(
        `https://saavn.dev/api/songs/jwvjfGwb/suggestions?limit=50`
      );
      const { data } = res.data;
      // console.log("data: ", data);
      setData(data);
      // setTrending(data.trending);
    } catch (error) {
      console.log(error);
    }
  }
  async function getHomePageData2() {
    try {
      const res = await axios(
        `https://saavn.dev/api/songs/XBtV-pNi/suggestions?limit=30`
      );
      const { data } = res.data;
      setTrending(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHomePageData();
    getHomePageData2();
  }, []);

  return (
    <>
      <section className="my-20">
        <h2 className="text-xl px-5 py-3 font-semibold text-gray-700  w-full  lg:w-[78vw] mx-auto ">
          Trending
        </h2>
        <Slider data={data} />
        <h2 className="text-xl px-5 py-3 font-semibold text-gray-700  w-full  lg:w-[78vw] mx-auto ">
          Only For You
        </h2>
        <Slider data={trending} />
      </section>
    </>
  );
};

export default MainSection;
