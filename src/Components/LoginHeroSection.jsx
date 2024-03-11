import { data } from "../SingersData/LoginPageData";
import { Link } from "react-router-dom";
import savan from "/savan-logo.png";

const LoginHeroSection = () => {
    
  function getRandomNumber() {
    var randomNumber = Math.floor(Math.random() * 8);
    return randomNumber + 1;
  }

  const randomIndex = getRandomNumber();

  const color = data[randomIndex].Color;
  const textColor = data[randomIndex].textColor;
  return (
    <div
      style={{ backgroundColor: color }}
      className={`hidden p-2 lg:block w-[50vw] h-screen`}
    >
      <div className="flex items-center gap-1 ">
        <Link to="/">
          <img src={savan} alt="" width={37} />
        </Link>
        <Link to="/" className="font-bold text-lg text-white">
          JioSavan
        </Link>
      </div>
      <div className="  flex justify-center items-center  h-[100vh]  mt-[-40px]">
        <div className="flex flex-col items-center text-center gap-6">
          <img
            src={data[randomIndex].image}
            alt={data[randomIndex].id}
            className="w-[500px] m-auto "
          />
          <div>
            <p className="text-4xl font-semibold text-white">All Your Music.</p>
            <p
              className="text-3xl font-semibold italic"
              style={{ color: textColor }}
            >
              Anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeroSection;
