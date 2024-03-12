import { createContext, useEffect, useState } from "react";

export const MusicContext = createContext();

function ContextProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAlbumChange, setIsalbumChange] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");

  const saveAuthToLocal = (userData) => {
    setEmail(userData.email);
    setIsAuth(true);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  useEffect(() => {
    // Check if userData is available in localStorage
    const storedUserData = localStorage.getItem("userData") ;

    if (storedUserData) {
      // If userData is available, parse and set it to component state
      const { isAuth, email } = JSON.parse(storedUserData) || {isAuth:false,email:""};
      setEmail(email);
      setIsAuth(isAuth);
    }
  }, [isAuth]);

  async function PlayMusic(music, id, name, duration, image, primaryArtists) {
    if (currentSong && currentSong.id === id) {
      if (isPlaying) {
        setIsPlaying(false);
        currentSong.audio.pause();
      } else {
        setIsPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setIsPlaying(false);
      }
      const newAudio = new Audio(music[4].url);
      setCurrentSong({
        name,
        duration,
        image: image[2].url,
        id,
        audio: newAudio,
        primaryArtists,
      });
      setIsPlaying(true);
      await newAudio.play();
    }
  }

  function nextSong() {
    if (currentSong) {
      const ind = songs.findIndex((song) => song.id === currentSong.id);
      if (ind === songs.length - 1) {
        const { downloadUrl, id, name, duration, image, primaryArtists } =
          songs[0];
        PlayMusic(downloadUrl, id, name, duration, image, primaryArtists);
      } else {
        const { downloadUrl, id, name, duration, image, primaryArtists } =
          songs[ind + 1];
        PlayMusic(downloadUrl, id, name, duration, image, primaryArtists);
      }
    }
  }
  function prevSong() {
    if (currentSong) {
      const ind = songs.findIndex((song) => song.id === currentSong.id);
      if (ind === 0) {
        const { downloadUrl, id, name, duration, image, primaryArtists } =
          songs[songs.length - 1];
        PlayMusic(downloadUrl, id, name, duration, image, primaryArtists);
      } else {
        const { downloadUrl, id, name, duration, image, primaryArtists } =
          songs[ind - 1];
        PlayMusic(downloadUrl, id, name, duration, image, primaryArtists);
      }
    }
  }

  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        PlayMusic,
        isPlaying,
        currentSong,
        nextSong,
        prevSong,
        setSearchedSongs,
        searchedSongs,
        isAlbumChange,
        setIsalbumChange,
        isAuth,
        setIsAuth,
        saveAuthToLocal,
        email
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export default ContextProvider;
