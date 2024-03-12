import React from "react";

const Loader = () => {
  return (
    <div className="">
      <div className="grid grid-rows-2 w-[78vw] grid-flow-col gap-4 px-5 overflow-x-scroll mx-auto scroll-hide">
        {new Array(20).fill(0).map((ele, ind) => (
          <div className=" flex flex-col gap-2">
            <div
              key={ind}
              className="w-[160px] h-[150px] overflow-y-clip flex flex-col justify-between bg-gray-500 items-center gap-3 rounded-lg blinkEffect"
            ></div>
            <div
              key={ind}
              className="w-[100px] h-[20px] overflow-y-clip flex flex-col justify-between bg-gray-500 items-center gap-3 rounded-lg blinkEffect"
            ></div>
            <div
              key={ind}
              className="w-[160px] h-[20px] overflow-y-clip flex flex-col justify-between bg-gray-500 items-center gap-3 rounded-lg blinkEffect"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
