"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";

// ✅ No need to use baseURL for images anymore, only for API
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseURL}/categories`);
        
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <TopHeader />
      <Navbar />

      {/* ✅ BANNER */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/products-image.png"
          alt="Products Banner"
          fill
          className="object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Our Categories</h1>
        </div>
      </section>

      {/* ✅ Breadcrumb */}
     <div className="px-6 py-4 text-sm bg-gray-100 border-b border-gray-200">
  <div className="max-w-6xl mx-auto text-gray-700">
    <Link href="/" className="hover:text-blue-400 hover:underline">
      Home
    </Link>{" "}
    /{" "}
    <span className="text-blue-600 font-medium">Categories</span>
  </div>
</div>


      {/* ✅ Categories Grid */}
      <div className="p-6 sm:px-8 md:px-12 lg:px-16 xl:px-32">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 underline ">
            <span className="inline-block pb-2 border-b-2 border-blue-400">
          Explore Our Categories
          </span>
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-red-400">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                href={`/categories/${cat.slug}`}
                key={cat._id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-xl transition"
              >
                {cat.imageUrl && (
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-md relative">
                    <Image
                      src={`${baseURL}${cat.imageUrl}`}
                      alt={cat.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}

                <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                  {cat.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  {cat.description || "No description provided."}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
