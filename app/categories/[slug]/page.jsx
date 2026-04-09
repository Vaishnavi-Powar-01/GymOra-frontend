
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryProducts = async () => {
      try {
        const apiUrl = `${baseURL}/products/categories/${slug}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data.products || []);
        setCategoryName(data.category || slug);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  return (
    <div className="bg-white text-black min-h-screen">
      <TopHeader />
      <Navbar />

      {/* Banner */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/products-image.png"
          alt="Category Banner"
          fill
          className="object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold capitalize">
            {categoryName || "Category"}
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
     <div className="px-6 py-4 text-sm bg-gray-100">
  <div className="max-w-6xl mx-auto text-gray-700">
    <Link href="/" className="hover:text-blue-400 hover:underline">
      Home
    </Link>{" "}
    /{" "}
    <Link href="/categories" className="hover:text-blue-400 hover:underline">
      Categories
    </Link>{" "}
    /{" "}
    <span className="text-blue-600 font-medium">
      {categoryName || slug}
    </span>
  </div>
</div>


      {/* Products Grid */}
      <div className="p-6 sm:px-8 md:px-12 lg:px-16 xl:px-32">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Products in "{categoryName || slug}"
        </h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-400 mb-2">Error loading products:</p>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-red-400">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-xl transition"
              >
                {product.image && (
                  <Link href={`/products/${product.slug}`}>
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-md relative transition-transform duration-300 ease-in-out hover:-translate-y-1">
                      <Image
                        src={`${baseURL}${product.image}`}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </Link>
                )}

                <h3 className="text-xl font-semibold mb-2 text-black">{product.name}</h3>
                <p className="text-gray-400 mb-2">
                  {product.description || "No description"}
                </p>
                <p className="text-green-600 font-bold">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}