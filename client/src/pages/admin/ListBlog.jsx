import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import BlogTableItem from "../../components/admin/BlogTableItem";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-8 px-4 sm:px-10 md:px-16 bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-800">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-extrabold text-primary mb-6"
      >
        📝 All Blog Entries
      </motion.h1>

      {/* Blog Table */}
      <div className="relative mt-4 overflow-x-auto max-w-6xl bg-white shadow-xl rounded-2xl border border-gray-200">
        {blogs.length > 0 ? (
          <table className="w-full text-sm sm:text-base text-gray-700">
            <tbody className="divide-y divide-gray-100">
              {blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-20 text-gray-500 font-medium">
            No blogs found. Start adding some content!
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBlog;
