"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ExploreByCategory({ categories = [] }) {
  const router = useRouter();

  if (!categories.length) {
    return (
      <section className="w-full bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-4xl font-anton mb-6 text-[#0F172A]">
            Explore Equipment by Category
          </h2>
          <p className="text-gray-500 text-lg">
            No categories available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-anton text-[#0F172A]">
            Explore Equipment by Category
          </h2>
          <p className="text-[#64748B] mt-3 text-lg">
            Browse through our wide range of fitness equipment
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.slice(0, 4).map((category) => (
            <div
              key={category.id}
              onClick={() => router.push(`/categories/${category.slug}`)}
              className="group cursor-pointer bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-[#475569] line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-14">
          <button
            onClick={() => router.push("/categories")}
            className="px-10 py-4 bg-blue-900 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition"
          >
            View All Categories →
          </button>
        </div>

      </div>
    </section>
  );
}
