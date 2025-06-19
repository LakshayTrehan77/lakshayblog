import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const links = [
  { path: "/admin", label: "Dashboard", icon: assets.home_icon, exact: true },
  { path: "/admin/addBlog", label: "Add Blogs", icon: assets.add_icon },
  { path: "/admin/listBlog", label: "Blog Lists", icon: assets.list_icon },
  { path: "/admin/comments", label: "Comments", icon: assets.comment_icon },
];

const Sidebar = () => {
  return (
    <aside className="flex flex-col bg-white/80 backdrop-blur-md border-r border-gray-200 w-16 md:w-64 transition-all duration-300 shadow-xl min-h-screen px-2 pt-6">
      {/* Sidebar Title */}
      <div className="hidden md:flex items-center justify-center mb-6">
        <h2 className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-sm">
          Admin Portal
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {links.map(({ path, label, icon, exact }) => (
          <NavLink
            key={path}
            to={path}
            end={exact}
            title={label}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 py-3 px-3 md:px-5 rounded-lg mx-1 transition-all duration-300 overflow-hidden
              ${
                isActive
                  ? "bg-gradient-to-r from-primary/10 to-purple-100 text-primary font-bold shadow-md"
                  : "hover:bg-purple-50 text-gray-700 font-semibold"
              }`
            }
          >
            {/* Icon with bounce effect */}
            <motion.img
              src={icon}
              alt={`${label} icon`}
              className="w-5 min-w-5 group-hover:scale-110 transition-transform duration-200"
              whileHover={{ scale: 1.2 }}
              whileTap={{ rotate: 5 }}
            />

            {/* Label */}
            <motion.span
              className="hidden md:inline-block text-lg font-bold drop-shadow-sm text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>

            {/* Active pill indicator */}
            {window.location.pathname === path && (
              <motion.div
                layoutId="activeSidebarIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Extra Footer Tip (optional) */}
      <div className="hidden md:block mt-auto p-4 text-xs text-gray-400 text-center">
        Powered by{" "}
        <span className="font-semibold text-primary">LakshayBlog</span>
      </div>
    </aside>
  );
};

export default Sidebar;
