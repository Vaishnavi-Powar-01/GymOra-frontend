"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const SignupPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${baseURL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "user" }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("success");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage("error");
      }
    } catch (error) {
      setMessage("network");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Page Background */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Join us and start your journey 🚀
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200
              ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Messages */}
          {message === "success" && (
            <p className="mt-4 text-center text-green-600 font-medium">
              ✅ Signup successful! Redirecting...
            </p>
          )}

          {message === "error" && (
            <p className="mt-4 text-center text-red-600 font-medium">
              ❌ Signup failed. Try again.
            </p>
          )}

          {message === "network" && (
            <p className="mt-4 text-center text-red-500 font-medium">
              ❌ Network error. Please check connection.
            </p>
          )}

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
