import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin,FaGithub,FaYoutube} from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">Follow us on our social media channels!</p>
        </div>

        {/* Social Media Links */}
        <div className="flex gap-x-6">
          <a
            href="https://web.facebook.com/doctorshavu025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
            aria-label="Follow us on Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.youtube.com/@Doctorshavu-Christian"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
            aria-label="Follow us on Facebook"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="https://x.com/DoctorShav052"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
            aria-label="Follow us on Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.instagram.com/doctorshavu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
            aria-label="Follow us on Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://github.com/Christian052"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
            aria-label="Follow us on Instagram"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/doctor-shavu-027252304/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition"
            aria-label="Follow us on LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} All rights reserved by Doctor Wi Shavu. 
      </div>
    </footer>
  );
};

export default Footer;
