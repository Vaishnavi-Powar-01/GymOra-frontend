"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Camera,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    birthdate: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Getting userId from localStorage
    const userId = localStorage.getItem("userId");
    console.log("Retrieved userId from localStorage:", userId);
    
    if (userId) {
      fetchUser(userId);
    } else {
      setMessage({ type: "error", text: "No user ID found. Please log in again." });
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      setLoading(true);
      console.log("Fetching user with ID:", userId);
      console.log("Using API URL:", `${API_BASE_URL}/users/${userId}`);
      
      const res = await fetch(`${API_BASE_URL}/users/${userId}`);
      console.log("Fetch response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch user data");
      }

      const data = await res.json();
      console.log("Fetched user data:", data);

      setUserData({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        birthdate: data.birthdate ? data.birthdate.slice(0, 10) : "",
      });

      // Set existing profile image if available
      if (data.profileImage) {
        const imageUrl = data.profileImage.startsWith('http') 
          ? data.profileImage 
          : `${API_BASE_URL}/${data.profileImage}`;
        setPreview(imageUrl);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setMessage({ type: "error", text: err.message || "Error fetching user data" });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = "Name is required";
    if (!userData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userData.email))
      newErrors.email = "Email is invalid";
    if (!userData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\+?[\d\s-()]+$/.test(userData.phone))
      newErrors.phone = "Phone number is invalid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: "Image size should be less than 5MB",
        });
        return;
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the errors below" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const userId = localStorage.getItem("userId");
      console.log("Updating user with ID:", userId);
      
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      const formData = new FormData();
      formData.append("name", userData.name.trim());
      formData.append("phone", userData.phone.trim());
      formData.append("email", userData.email.trim());
      
      if (userData.birthdate) {
        formData.append("birthdate", userData.birthdate);
      }
      
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const updateUrl = `${API_BASE_URL}/users/${userId}`;
      console.log("Sending update request to:", updateUrl);

      const res = await fetch(updateUrl, {
        method: "PUT",
        body: formData,
      });

      console.log("Update response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Update error response:", errorData);
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await res.json();
      console.log("Updated user data:", updatedUser);
      
      setMessage({ type: "success", text: "Profile updated successfully!" });

      // Update local state with new data
      setUserData({
        name: updatedUser.name || "",
        phone: updatedUser.phone || "",
        email: updatedUser.email || "",
        birthdate: updatedUser.birthdate ? updatedUser.birthdate.slice(0, 10) : "",
      });

      // Update profile image preview if new image was uploaded
      if (updatedUser.profileImage) {
        const imageUrl = updatedUser.profileImage.startsWith('http') 
          ? updatedUser.profileImage 
          : `${API_BASE_URL}/${updatedUser.profileImage}`;
        setPreview(imageUrl);
      }
      setImageFile(null);

      setTimeout(() => {
        console.log("Profile updated successfully, redirecting...");
      }, 1500);
    } catch (err) {
      console.error("Submit error:", err);
      setMessage({
        type: "error",
        text: err.message || "Error updating profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching user data
  if (loading && !userData.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 flex items-center justify-center">
        <div className="text-gray-800 text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Update Profile</h1>
          <p className="text-gray-600">Keep your information up to date</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Profile Image */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 border-4 border-gray-300 shadow-lg">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full p-3 cursor-pointer transition-all shadow-lg hover:scale-105">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Click the camera icon to change photo
              </p>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500 bg-gray-50" : "border-gray-300 bg-white"
                  } text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 focus:outline-none transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500 bg-gray-50" : "border-gray-300 bg-white"
                  } text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 focus:outline-none transition-all`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? "border-red-500 bg-gray-50" : "border-gray-300 bg-white"
                  } text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 focus:outline-none transition-all`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Birthdate */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={userData.birthdate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/user/dashboard')}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Your information is secure and will only be used to improve your experience.
          </p>
        </div>
      </div>
    </div>
  );
}