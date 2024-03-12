import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import savan from "/savan-logo.png";
import LoginHeroSection from "../Components/LoginHeroSection";
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { MusicContext } from "../Context/MusicContext.jsx";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const { isAuth, setIsAuth,saveAuthToLocal } = useContext(MusicContext);

  const navigate=useNavigate()

  function handleInputChage(e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  function handleLogIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user: ', user);
        if (user.uid) {
         
          saveAuthToLocal({"email":user.email,isAuth:true})
          navigate("/");
        }
        setUserDetails({ email: "", password: "" });
        toast.success("LogIn successful ");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage: ", errorMessage);
        toast.error(errorMessage);
      });
  }

  return (
    <>
      <div className="flex  ">
        <LoginHeroSection />

        <div className={`flex flex-col  p-4  w-[100vw] lg:w-[50vw] h-screen`}>
          <Toaster />
          <div className="flex justify-between lg:justify-end items-center mb-5">
            <div className="flex items-center gap-1 lg:hidden">
              <Link
                to="/"
                className="font-bold text-lg text-black flex items-center"
              >
                <img src={savan} alt="" width={37} />
                JioSavan
              </Link>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 hidden lg:inline italic mr-2">
                Don't have a JioSaavan account yet?
              </span>
              <Link to={"/signUp"}>
                <button className="border text-xs border-black px-3 font-semibold hover:text-white hover:bg-black py-1.5 rounded-full">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          <div className="m-auto">
            {/* 1st div */}
            <div className="w-[400px] h-[500px]  flex flex-col gap-4 p-2">
              <div>
                <h1 className="text-3xl font-semibold">Welcome to JioSaavn.</h1>
                <h4 className="text-gray-500">
                  Log in or sign up with your mobile number.
                </h4>
              </div>

              {/* 2nd div */}
              <div>
                <form action="">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    id="email"
                    value={userDetails.email}
                    className="w-full h-12 rounded-full placeholder:italic placeholder:text-center border focus:outline-none mb-3 pl-4"
                    onChange={(e) => handleInputChage(e)}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    id="password"
                    value={userDetails.password}
                    className="w-full h-12 rounded-full placeholder:italic placeholder:text-center border focus:outline-none mb-4 pl-4"
                    onChange={(e) => handleInputChage(e)}
                  />
                  <button
                    onClick={(e) => handleLogIn(e)}
                    className="w-full text-[20px] font-semibold hover:bg-[#258F83] transition-all duration-300  h-12 rounded-full text-white bg-[#1ECCB0]"
                  >
                    Continue
                  </button>
                </form>
              </div>

              {/* 3rd div */}
              <div>
                <p className="text-gray-500 italic text-xs">
                  Select ‘Continue’ to give consent to JioSaavn’s Terms of
                  Service and acknowledge that you have read and understood the
                  Privacy Policy. An SMS may be sent to authenticate your
                  account, and message and data rates may apply.
                </p>
              </div>

              {/* 4th div */}
              <div className="text-center">
                <div className="border-[1px]"></div>
                <p className="text-center relative -top-3.5 px-4 inline mx-auto  text-gray-400 text-xs font-semibold bg-[#F5F5F5]">
                  OR CONNECT WITH
                </p>
              </div>

              {/* 5th div */}
              <div className="flex justify-between">
                <button className="w-[48%] text-[18px] font-semibold hover:bg-[#828DA8] transition-all duration-300  h-12 rounded-full text-white bg-black">
                  Google
                </button>
                <button className="w-[48%] text-[18px] font-semibold hover:bg-[#273861] transition-all duration-300  h-12 rounded-full text-white bg-[#3D5798]">
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
