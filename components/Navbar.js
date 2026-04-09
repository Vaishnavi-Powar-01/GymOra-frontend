"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Navbar() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    isLoggedIn: false,
    name: "",
    role: "",
  });

  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const categoryRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name =
      localStorage.getItem("username") || localStorage.getItem("name");
    const role = localStorage.getItem("userRole");

    setUserData({
      isLoggedIn: !!token,
      name: name || "",
      role: role || "",
    });

    fetch(`${baseURL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});

    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <nav className="w-full sticky top-0 z-50 bg-blue-50 border-b border-blue-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 flex items-center justify-between h-20">

        {/* Brand */}
        <Link href="/" className="text-3xl font-extrabold text-blue-900">
          GYM<span className="text-blue-600">ORA</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-semibold text-blue-900">
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>

          {/* Categories Dropdown */}
          <div
            ref={categoryRef}
            className="relative"
            onMouseEnter={() => setShowCategoryDropdown(true)}
            onMouseLeave={() => setShowCategoryDropdown(false)}
          >
            <button
              onClick={() => router.push("/categories")}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              Categories
              <ChevronDown
                className={`w-4 h-4 transition ${
                  showCategoryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showCategoryDropdown && (
              <div className="absolute left-0 top-full bg-white shadow-xl rounded-xl w-56 z-50 border border-blue-100">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      router.push(`/categories/${cat.slug}`);
                      setShowCategoryDropdown(false);
                    }}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer"
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/blogs" className="hover:text-blue-600">Blog</Link>
        </div>

        {/* Desktop Right Actions */}
<div className="hidden md:flex items-center gap-4" ref={userRef}>
  <button
    onClick={() => {
      if (!userData.isLoggedIn) {
        alert("Please login first to do enquiry");
        router.push("/login");
      } else {
        router.push("/user/enquiry");
      }
    }}
    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-bold"
  >
    Enquiry
  </button>


          {!userData.isLoggedIn ? (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-900 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-semibold"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-3 bg-blue-900 px-5 py-2.5 rounded-lg hover:bg-blue-700"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold">
                    {capitalizeFirstLetter(userData.name.charAt(0))}
                  </span>
                </div>
                <span className="text-white">
                  {capitalizeFirstLetter(userData.name.split(" ")[0])}
                </span>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 top-14 bg-white shadow-xl rounded-xl w-44 p-2 border border-blue-100">
                  <button
                    onClick={() =>
                      router.push(
                        userData.role === "admin"
                          ? "/admin/dashboard"
                          : "/user/dashboard"
                      )
                    }
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      router.push("/login");
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
        >
          <span className="block w-7 h-0.5 bg-blue-900 mb-1.5"></span>
          <span className="block w-7 h-0.5 bg-blue-900 mb-1.5"></span>
          <span className="block w-7 h-0.5 bg-blue-900"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-50 border-t border-blue-200 px-6 py-6">
          <div className="flex flex-col gap-4 font-semibold text-blue-900">
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/blogs">Blogs</Link>

          <button
  onClick={() => {
    if (!userData.isLoggedIn) {
      alert("Please login first to do enquiry");
      router.push("/login");
    } else {
      router.push("/user/enquiry");
    }
  }}
  className="bg-orange-500 text-white py-3 rounded-xl text-center font-bold"
>
  Enquiry
</button>


            {!userData.isLoggedIn ? (
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-900 text-white py-3 rounded-xl font-bold"
              >
                Login
              </button>
            ) : (
              <div className="bg-white rounded-xl border border-blue-200 p-4">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="font-bold text-blue-900 mb-3">
                  {capitalizeFirstLetter(userData.name)}
                </p>

                <button
                  onClick={() =>
                    router.push(
                      userData.role === "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    )
                  }
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg"
                >
                  My Account
                </button>

                <button
                  onClick={() => {
                    localStorage.clear();
                    router.push("/login");
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
