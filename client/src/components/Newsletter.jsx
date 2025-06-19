import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-5 my-32 px-4 animate-fadeInUp">
      {/* Heading */}
      <h1 className="md:text-5xl text-3xl font-extrabold text-gray-800">
        Stay in the Loop with <span className="text-primary">LAKSHAYBLOG</span>
      </h1>

      {/* Subheading */}
      <p className="md:text-lg text-base text-gray-600 max-w-2xl">
        Subscribe to receive the latest blogs, tech insights, and exclusive
        updates directly to your inbox.
      </p>

      {/* Form */}
      <form className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12 mt-4 shadow-xl rounded-md overflow-hidden border border-gray-300 transition-all duration-300 group">
        <input
          className="w-full h-full px-4 text-gray-700 text-sm md:text-base outline-none placeholder-gray-400 focus:ring-2 focus:ring-primary transition-all duration-300"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 md:px-10 text-sm md:text-base font-semibold h-full transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
