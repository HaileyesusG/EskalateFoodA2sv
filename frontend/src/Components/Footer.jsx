// Footer.js
import React from "react";
import { FaTiktok, FaInstagram, FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-6">
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://www.tiktok.com/@masterfixethiopia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition"
        >
          <FaTiktok size={30} />
        </a>
        <a
          href="https://www.instagram.com/masterfixethiopia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-500 transition"
        >
          <FaInstagram size={30} />
        </a>
        <a
          href="https://www.facebook.com/haile321"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >
          <FaFacebook size={30} />
        </a>
        <a
          href="https://t.me/africa_dish"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          <FaTelegram size={30} />
        </a>
        <a
          href="https://www.youtube.com/@africainfotec6061"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-300 transition"
        >
          <FaYoutube size={30} />
        </a>
      </div>
      <p className="text-sm">© 2024 MasterFix. All rights reserved.</p>
    </footer>
  );
};

export default Footer;