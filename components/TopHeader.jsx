"use client";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const TopHeader = () => {
  return (
    <div className="w-full bg-blue-900 border-b border-blue-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center py-2 md:py-3 text-blue-100 text-sm">

          {/* Left: Email & Phone */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center">
            <div className="flex items-center gap-1 md:gap-2">
              <MdEmail className="text-base text-blue-200" />
              <span className="font-medium">info@gymora.com</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <FiPhoneCall className="text-base text-blue-200" />
              <span className="font-medium">+91 98765 43210</span>
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-3 mt-2 md:mt-0">
            <FaFacebookF className="text-base cursor-pointer text-blue-200 hover:text-white transition" />
            <FaInstagram className="text-base cursor-pointer text-blue-200 hover:text-pink-400 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
