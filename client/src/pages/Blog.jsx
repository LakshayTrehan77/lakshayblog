import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Moment from "moment";
import { motion } from "framer-motion";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const commentInputRef = useRef(null);

  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      res.data.success ? setData(res.data.blog) : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.post("/api/blog/comments", { blogId: id });
      res.data.success
        ? setComments(res.data.comments)
        : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setContent("");
        fetchComments();
        commentInputRef.current?.focus();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative bg-gradient-to-br from-white to-blue-50 min-h-screen text-gray-700">
      <Navbar />
      
      <motion.div
        className="text-center mt-24 px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-primary font-medium mb-2">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-snug text-gray-900 bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
          {data.title}
        </h1>
        <h2 className="text-gray-600 mt-4 text-lg italic font-medium">
          “{data.subTitle}”
        </h2>
        <p className="inline-block mt-4 py-1 px-5 rounded-full text-sm border border-primary bg-primary/10 text-primary font-medium shadow">
          Written by: <span className="font-bold">Michael Brown</span>
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto p-6 sm:p-10">
        <motion.img
          src={data.image}
          alt="Blog Cover"
          className="w-full rounded-2xl shadow-xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        <div
          className="prose max-w-3xl mx-auto text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">
            💬 Reader Comments
          </h3>
          <div className="flex flex-col gap-6">
            {comments.map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={assets.user_icon} alt="user" className="w-6" />
                  <span className="font-semibold text-gray-800">
                    {item.name}
                  </span>
                </div>
                <p className="text-gray-600 ml-9">{item.content}</p>
                <div className="text-right text-xs text-gray-400 mt-2">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            📝 Leave a Comment
          </h3>
          <form onSubmit={addComment} className="flex flex-col gap-4">
            <input
              ref={commentInputRef}
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            />
            <textarea
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2.5 px-6 rounded-full hover:scale-105 transition-all shadow-md"
            >
              Post Comment
            </button>
          </form>
        </div>

        {/* Share Section */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🔗 Share This Article
          </h3>
          <div className="flex justify-center gap-6 mt-2">
            <img
              src={assets.facebook_icon}
              className="w-10 hover:scale-110 transition"
              alt="Facebook"
            />
            <img
              src={assets.twitter_icon}
              className="w-10 hover:scale-110 transition"
              alt="Twitter"
            />
            <img
              src={assets.googleplus_icon}
              className="w-10 hover:scale-110 transition"
              alt="Google+"
            />
            <button
              onClick={copyShareLink}
              className="text-sm border border-gray-300 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
