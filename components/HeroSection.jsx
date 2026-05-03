"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/products");
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image (NO TEXT ON IMAGE) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/GymOra.png"
          alt="Professional gym equipment background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </div>

      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-white/60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-[1400px] w-full px-8 text-center">

          {/* Quote */}
          <h1 className="font-anton mb-8 leading-tight tracking-tight">
            <span className="block text-[clamp(2.5rem,7vw,5rem)] text-gray-900">
              The pain you feel today
            </span>

            <span className="block text-[clamp(2.5rem,7vw,5rem)] mt-3">
              <span className="text-blue-600">will be the </span>
              <span className="text-orange-500 font-bold">strength</span>
            </span>

            <span className="block text-[clamp(2.5rem,7vw,5rem)] mt-3 ml-8 text-gray-900">
              you feel tomorrow.
            </span>
          </h1>

          {/* Sub text (optional but clean) */}
          <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Consistency. Discipline. Results.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleExploreClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Explore our fitness equipment products"
          >
            Explore Products
          </button>
        </div>
      </div>
    </section>
  );
}
