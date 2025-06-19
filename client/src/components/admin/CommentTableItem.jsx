import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

// Utility: Relative time formatter
const getRelativeDate = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count > 0) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
};

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const { axios } = useAppContext();
  const [expanded, setExpanded] = useState(false);

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const BlogDate = new Date(createdAt);

  return (
    <tr className="hover:bg-gray-50 transition">
      <td colSpan={3} className="p-6">
        <div className="w-full rounded-xl border border-gray-200 shadow-lg p-6 space-y-4 bg-white transition-all duration-300">
          {/* Blog and user info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-primary">
                📝 {blog.title}
              </h3>
              <p className="text-gray-600 font-semibold mt-1">
                👤 <strong className="text-gray-800">By:</strong> {name}
              </p>
              <p className="text-sm text-gray-400">
                📅 {getRelativeDate(BlogDate)}
              </p>
            </div>

            {/* Status badge */}
            <div className="text-sm">
              {isApproved ? (
                <span
                  title="Comment has been approved"
                  className="px-5 py-1.5 text-sm bg-green-100 text-green-800 border border-green-500 rounded-full font-bold shadow-inner animate-pulse hover:scale-105 transition"
                >
                  ✅ Approved
                </span>
              ) : (
                <span
                  title="Comment pending approval"
                  className="px-5 py-1.5 text-sm bg-yellow-100 text-yellow-900 border border-yellow-500 rounded-full font-bold shadow animate-pulse hover:scale-105 transition"
                >
                  ⏳ Pending
                </span>
              )}
            </div>
          </div>

          {/* Comment Content */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-700 text-md leading-relaxed">
            {expanded || content.length <= 150
              ? content
              : `${content.slice(0, 150)}...`}

            {content.length > 150 && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="ml-2 text-primary font-semibold text-sm hover:underline"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
            {!isApproved && (
              <button
                onClick={approveComment}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hover:scale-105"
              >
                ✅ Approve
              </button>
            )}
            <button
              onClick={deleteComment}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hover:scale-105"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
