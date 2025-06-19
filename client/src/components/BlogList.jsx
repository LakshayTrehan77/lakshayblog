import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // Filter blogs by search input
  const filteredBlogs = () => {
    if (input.trim() === "") return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  // Animation for fade-in
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen pt-10">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative z-10 px-5 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 overflow-hidden
                ${
                  menu === item
                    ? "text-white"
                    : "text-gray-600 hover:text-primary/80"
                }`}
            >
              {/* Text stays on top */}
              <span className="relative z-20">{item}</span>

              {/* Animated Background */}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute inset-0 z-0 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-28 px-6 sm:px-16 xl:px-32"
      >
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </motion.div>
    </div>
  );
};

export default BlogList;
