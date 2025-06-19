import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-5 md:p-10 bg-gradient-to-b from-blue-50 to-white text-gray-800 min-h-screen">
      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-extrabold text-primary drop-shadow-sm mb-8"
      >
        🧭 Admin Dashboard Overview
      </motion.h1>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: assets.dashboard_icon_1,
            label: "Total Blogs",
            value: dashboardData.blogs,
            bg: "bg-white",
          },
          {
            icon: assets.dashboard_icon_2,
            label: "Total Comments",
            value: dashboardData.comments,
            bg: "bg-white",
          },
          {
            icon: assets.dashboard_icon_3,
            label: "Draft Blogs",
            value: dashboardData.drafts,
            bg: "bg-white",
          },
        ].map(({ icon, label, value, bg }, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 ${bg} p-5 rounded-xl shadow-md transition-all duration-300 cursor-pointer`}
          >
            <img src={icon} alt="icon" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-gray-700">{value}</p>
              <p className="text-gray-500 font-medium">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Latest Blogs Section */}
      <div>
        <div className="flex items-center gap-3 mb-5 text-gray-700">
          <img src={assets.dashboard_icon_4} alt="" className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-semibold">
            Latest Blog Posts
          </h2>
        </div>

        <div className="relative max-w-6xl overflow-x-auto bg-white border rounded-2xl shadow-xl scrollbar-hide">
          {dashboardData.recentBlogs.length > 0 ? (
            <table className="w-full text-sm sm:text-base text-gray-700">
              <tbody className="divide-y divide-gray-100">
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center py-16 text-gray-500 font-medium">
              No recent blogs to show.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
