import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import logo from "../../assets/Blue_Waves_Surfing_Club_Logo-removebg-preview.png";

const Login = () => {
  const { axios, setToken, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl px-8 py-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="LakshayBlog Logo"
            className="w-36 sm:w-40 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary drop-shadow-sm">
            Admin Login
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Enter your credentials to access the LakshayBlog admin dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secure password"
              className="rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md font-bold text-lg shadow-md hover:bg-primary/90 transition"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">LakshayBlog</span>. All
          rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
