"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const OurLatestEquipment = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch(`${baseURL}/products?populate=category`);
        const data = await res.json();

        const updated = data.map((product) => ({
          ...product,
          image: `${baseURL}${product.image.replace(/\\/g, "/")}`,
        }));

        setEquipment(updated);
      } catch (err) {
        console.error("Failed to fetch equipment:", err);
      }
    };

    fetchEquipment();
  }, []);

  if (equipment.length === 0) return null;

  return (
    <section className="w-full bg-white text-black py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[48px] font-anton font-normal uppercase tracking-normal leading-none mb-3">
            OUR LATEST EQUIPMENT
          </h2>
          <div className="w-24 h-1 bg-[#5B81E0] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-500 text-[18px] font-roboto max-w-2xl mx-auto leading-relaxed">
            Built for Strength. Designed for Performance.
          </p>
        </div>

        {/* Carousel Container with proper spacing */}
        <div className="relative px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {equipment.map((item, index) => (
                <CarouselItem
                  key={item.id || index}
                  className="pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-gray-50 hover:bg-white transition-all duration-300 rounded-xl p-6 h-full flex flex-col border border-gray-100 hover:border-gray-200">
                    <Link href={`/products/${item.slug}`} passHref>
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-5 group cursor-pointer">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 ease-in-out group-hover:-translate-y-1"
                          loading={index < 3 ? "eager" : "lazy"}
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-grow text-center">
                      <h3 className="text-white text-[18px] font-bold mb-2 font-roboto">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        <strong>Category:</strong>{" "}
                        {item.category?.name || "Uncategorized"}
                      </p>
                      <p className="text-[#00ff99] text-[20px] font-bold">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows with proper spacing */}
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-[#5B81E0] hover:bg-[#4a70c0] text-white w-12 h-12 rounded-full border-0 transition-all duration-300 flex items-center justify-center z-10 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </CarouselPrevious>
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-[#5B81E0] hover:bg-[#4a70c0] text-white w-12 h-12 rounded-full border-0 transition-all duration-300 flex items-center justify-center z-10 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default OurLatestEquipment;