import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AlbumItem from "./AlbumItem";
import { useRef } from "react";
const Slider = ({ data }) => {
  // console.log("data: ", data);

  const SliderRef = useRef(null);

  const SlideLeft = () => {
    SliderRef.current.scrollLeft -= 800;
  };
  const SlideRight = () => {
    SliderRef.current.scrollLeft += 800;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <MdChevronLeft
        className="text-3xl text-gray-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
        onClick={SlideLeft}
      />

      <div
        className="grid grid-rows-2 w-[78vw] grid-flow-col gap-4 px-5 overflow-x-scroll scroll-hide"
        ref={SliderRef}
      >
        {data.map((song) => (
          <AlbumItem key={song.id} song={song} />
        ))}
      </div>

      <MdChevronRight
        className="text-3xl text-gray-600 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
        onClick={SlideRight}
      />
    </div>
  );
};

export default Slider;
