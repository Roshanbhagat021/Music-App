import { useContext } from "react";
import { MusicContext } from "../Context/MusicContext";
import { Link } from "react-router-dom";

const SongItems = ({
  name,
  id,
  image,
  artists,
  duration,
  downloadUrl,
  album,
}) => {
  const { id: albumId } = album;

  const { PlayMusic } = useContext(MusicContext);

  const Artists = artists.primary.map((artist) => artist.name).join(",");
  console.log("Artists: ", Artists);

  return (
    <Link
      to={`/albums/${albumId}`}
      className="w-[160px] max-h-[220px] overflow-y-clip flex flex-col justify-between items-center gap-3 rounded-lg"
    >
      <img
        src={image[2].url}
        alt={name.replace(/&quot;/g, '"')}
        className="cursor-pointer rounded-lg"
        onClick={() =>
          PlayMusic(downloadUrl, id, name, duration, image, Artists)
        }
      />
      <div className="flex text-[13px] w-full flex-col justify-center items-center ">
        <span className="font-semibold overflow-x-clip">{name}</span>
      </div>
    </Link>
  );
};

export default SongItems;
