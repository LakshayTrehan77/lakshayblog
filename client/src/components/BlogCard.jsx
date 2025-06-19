import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full aspect-video object-cover group-hover:brightness-95 transition duration-300"
      />

      {/* Category Badge */}
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/10 text-primary text-xs font-medium rounded-full tracking-wide">
        {category}
      </span>

      {/* Text Content */}
      <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h5>
        <p
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 100) + "...",
          }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
