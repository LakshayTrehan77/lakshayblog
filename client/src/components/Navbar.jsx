import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo with hover effect */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo2}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-md"
      />

      {/* Enhanced Button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-base font-semibold cursor-pointer bg-primary text-white px-12 py-3 transition-all duration-300 transform hover:scale-105 hover:bg-purple-700 shadow-md hover:shadow-lg"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className="w-4" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
