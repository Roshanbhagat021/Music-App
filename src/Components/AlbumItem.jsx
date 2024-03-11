import { useState } from "react";
import { Link } from "react-router-dom";
const AlbumItem = ({ song }) => {
  // console.log("album: ", album);
  const {
    album: { id },
    name,
    image,
    artists,
  } = song;

  return (
    <>
      <Link
        to={`/albums/${id}`}
        className="w-[160px] max-h-[220px] overflow-y-clip flex flex-col justify-between items-center gap-3 rounded-lg"
      >
        <img
          src={image[1].url}
          alt=""
          className="rounded-lg "
          draggable="false"
        />
        <div className="text-[12px] w-full flex flex-col justify-center items-center">
          <span className="text-gray-600 font-semibold overflow-x-clip">
            {name.replace(/&quot;/g, '"')}
          </span>
          <p className="text-gray-500 font-thin ">
            {artists.primary.map((artist) => artist.name).join(",").length > 24
              ? artists.primary
                  .map((artist) => artist.name)
                  .join(",")
                  .slice(0, 24) + "..."
              : artists.primary.map((artist) => artist.name).join(",")}
          </p>
        </div>
      </Link>
    </>
  );
};

export default AlbumItem;
