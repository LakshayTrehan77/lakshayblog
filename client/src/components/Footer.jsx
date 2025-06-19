import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5 text-gray-700">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-gray-400/20">
        {/* Logo & About */}
        <div className="max-w-md">
          <img
            src="src/assets/Blue_Waves_Surfing_Club_Logo-removebg-preview.png"
            alt="logo"
            className="w-32 sm:w-44 mb-4"
          />
          <p className="leading-relaxed text-sm sm:text-base text-gray-600">
            <strong>LAKSHAYBLOG</strong> is your digital canvas for sharing
            stories, ideas, tutorials, and inspiration. Built for creators who
            value clarity, creativity, and community.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-6">
          {footer_data.map((section, index) => (
            <div key={index} className="min-w-[130px]">
              <h3 className="font-semibold text-base text-gray-900 mb-3">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1 text-gray-600">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline transition duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="py-5 text-center text-sm sm:text-base text-gray-500 font-medium">
        © 2025 <strong>LAKSHAYBLOG</strong>. All rights reserved. Crafted with
        passion & purpose.
      </p>
    </div>
  );
};

export default Footer;
