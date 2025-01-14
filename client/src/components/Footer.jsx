import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between">
        <p>© All Rights Reserved 2025.</p>

        <div className="flex items-center gap-4 justify-center text-2xl">
          <a href="" className="hover:text-yellow-300">
            <CiFacebook />
          </a>
          <a href="" className="hover:text-yellow-300">
            <FaInstagram />
          </a>
          <a href="" className="hover:text-yellow-300">
            <FaSquareYoutube />
          </a>
          <a href="" className="hover:text-yellow-300">
            <FaTelegram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
