import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between h-[100px] px-4 sm:px-12 border-b border-gray-200 bg-white shadow-sm">
        <img
          src={assets.logo2}
          alt="logo"
          className="w-32 sm:w-40 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        />

        <button
          onClick={logout}
          className="text-sm sm:text-base px-8 py-2.5 bg-primary text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-purple-700"
        >
          Logout
        </button>
      </div>

      {/* Content Section */}
      <div className="flex h-[calc(100vh-80px)] bg-gray-50">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
