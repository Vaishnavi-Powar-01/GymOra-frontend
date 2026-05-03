"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setLoading(true);

      const res = await fetch(`${baseURL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Subscribed Successfully!");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-100 text-gray-700 pt-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-200 pb-10">

          {/* OUR SERVICES */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms & Conditions", path: "/terms-and-conditions" },
                { name: "Refund Policy", path: "/refund-policy" },
                { name: "Delivery Information", path: "/delivery-info" },
                { name: "Customer Support", path: "/customer-service" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="hover:text-blue-600 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">
              Information
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "About Gymora", path: "/about" },
                { name: "Our Programs", path: "/categories" },
                { name: "Blogs & Tips", path: "/blogs" },
                { name: "FAQs", path: "/faqs" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="hover:text-blue-600 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MY ACCOUNT */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">
              My Account
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "My Profile", path: "/user/dashboard" },
                { name: "Workout Dashboard", path: "/dashboard" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="hover:text-blue-600 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-gray-900">
              Stay Connected
            </h4>
            <p className="text-sm text-gray-600 mb-5">
              Join Gymora’s community and get fitness tips, offers, and updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-sm transition disabled:opacity-60"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white py-5 text-center border-t border-gray-200">
        <p className="text-sm text-gray-600">
          © 2025 <span className="font-semibold text-gray-800">Gymora</span>.  
          Built with <span className="text-blue-500">💙</span> by Vaishnavi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

