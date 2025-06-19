import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

// Utility to format date nicely
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished, _id } = blog;
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr>
      <td colSpan={5} className="p-6">
        <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6 transition-all hover:shadow-primary/25 hover:scale-[1.01] duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Blog title and date */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {index}. {title}
              </h2>
              <p className="text-sm text-gray-500">
                📅 {formatDate(createdAt)}
              </p>
            </div>

            {/* Publish status badge */}
            <div className="text-sm">
              {isPublished ? (
                <span className="px-4 py-1.5 bg-green-100 border border-green-600 text-green-700 rounded-full font-bold text-xs shadow-sm">
                  ✅ Published
                </span>
              ) : (
                <span className="px-4 py-1.5 bg-orange-100 border border-orange-600 text-orange-700 rounded-full font-bold text-xs animate-pulse shadow-sm">
                  ⏳ Unpublished
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap justify-start sm:justify-end gap-4">
            <button
              onClick={togglePublish}
              className={`text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md transition-all hover:scale-105 ${
                isPublished
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isPublished ? "Unpublish" : "Publish"}
            </button>

            <button
              onClick={deleteBlog}
              title="Delete blog"
              className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full shadow-md transition-all hover:scale-105"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
