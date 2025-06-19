import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import CommentTableItem from "../../components/admin/CommentTableItem";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    filter === "Approved" ? comment.isApproved : !comment.isApproved
  );

  return (
    <div className="flex-1 pt-10 px-6 sm:px-16 bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-800">
      {/* Page Heading */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-extrabold text-primary drop-shadow-sm mb-8"
      >
        🗨️ Manage Blog Comments
      </motion.h1>

      {/* Filter Switch */}
      <div className="flex justify-between items-center max-w-4xl mb-6 flex-wrap gap-3">
        <div className="flex gap-4 flex-wrap">
          {["Approved", "Not Approved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`text-sm sm:text-base font-semibold px-5 py-2 rounded-full border transition-all duration-300 shadow-md hover:scale-105 ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <p className="text-sm sm:text-base text-gray-500">
          Showing: <strong>{filter}</strong> comments
        </p>
      </div>

      {/* Comments Table */}
      <div className="relative max-w-4xl overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100 scrollbar-hide">
        {filteredComments.length > 0 ? (
          <table className="w-full text-sm sm:text-base text-gray-700">
            <thead className="text-xs sm:text-sm uppercase border-b border-gray-200">
              <tr className="text-left">
                <th
                  scope="col"
                  className="px-6 py-4 font-semibold tracking-wide"
                >
                  Blog & Comment Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-semibold max-sm:hidden"
                >
                  Submitted On
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-500 font-medium text-base">
            No {filter.toLowerCase()} comments available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
