"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminBlogPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.content) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create blog");

      toast.success("Blog published successfully 🎉");
      setForm({
        title: "",
        description: "",
        content: "",
        image: "",
        videoUrl: "",
      });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Blog
          </h1>
          <p className="text-gray-600">
            Publish fitness blogs & video content for Gymora users
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Short Description *
              </label>
              <textarea
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                placeholder="Short summary for blog listing"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Full Content */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Blog Content *
              </label>
              <textarea
                name="content"
                rows="6"
                value={form.content}
                onChange={handleChange}
                placeholder="Write full blog content here..."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Blog Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://image-url.com/banner.jpg"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                YouTube Video URL
              </label>
              <input
                type="text"
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=xxxx"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}
