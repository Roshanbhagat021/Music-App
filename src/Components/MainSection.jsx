import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slider from "./Slider";
import Loader from "./Loader";
import { ApiForSongSuggestions1,ApiForSongSuggestions2 } from "../ApiDetails/Api";

const MainSection = () => {
  const [data, setData] = useState([]);
  // console.log("data: ", data);
  const [trending, setTrending] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  async function getHomePageData() {
    setIsLoading(true)
    try {
      const res = await axios(
        ApiForSongSuggestions1
      );
      const { data } = res.data;
      // console.log("data: ", data);
      setData(data);
      // setTrending(data.trending);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  async function getHomePageData2() {
    setIsLoading(true)
    try {
      const res = await axios(
        ApiForSongSuggestions2
      );
      const { data } = res.data;
      setTrending(data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
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
        {isLoading?<Loader/>:   <Slider data={data} />}
     
        <h2 className="text-xl px-5 py-3 font-semibold text-gray-700  w-full  lg:w-[78vw] mx-auto ">
          Only For You
        </h2>
        {isLoading?<Loader/>:    <Slider data={trending} />}
       
      </section>
    </>
  );
};

export default MainSection;
