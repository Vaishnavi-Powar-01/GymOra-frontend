import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreByCategory from "@/components/ExploreByCategory";
import HeroSection from "@/components/HeroSection";
import OurLatestEquipment from "@/components/OurLatestEquipment";
import Image from "next/image";

export const dynamic = "force-dynamic";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const getCategories = async () => {
  try {
    const res = await fetch(`${baseURL}/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API Error:", res.status);
      return [];
    }

    const result = await res.json();
    console.log("Categories API:", result);

    const categoryArray = result.data || result;
    if (!Array.isArray(categoryArray)) return [];
    return categoryArray.map((cat) => ({
      id: cat._id,
      name: cat.name,
      description: cat.description || "",
      slug:
        cat.slug || cat.name?.toLowerCase().replace(/\s+/g, "-") || "category",
      image: cat.imageUrl
        ? `${baseURL}${cat.imageUrl.replace(/\\/g, "/")}`
        : "/placeholder.jpg",
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

/* ---------------- COMMERCIAL SECTION ---------------- */
const CommercialGymSection = () => (
  <section className="w-full bg-[#F8FAFC] py-20 border-t border-[#E5E7EB]">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
      <h2 className="text-[40px] md:text-[44px] font-anton text-center mb-16 text-[#0F172A]">
        COMMERCIAL GYM & FITNESS EQUIPMENT MANUFACTURER
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-14">
        {/* Image */}
        <div className="w-full lg:w-1/2 h-[520px]">
          <Image
            src="/hero-section.jpg"
            alt="Commercial gym equipment"
            width={900}
            height={900}
            className="rounded-2xl object-cover w-full h-full shadow-md"
            priority
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2">
          {/* Commercial */}
          <div className="flex gap-6 mb-12">
            <div className="w-20 h-20 relative bg-white rounded-xl shadow-sm p-3">
              <Image
                src="/icons/commercial-icon.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-[26px] font-anton uppercase mb-4 text-[#0F172A]">
                Commercial Gym Equipment
              </h3>
              <p className="text-[#475569] text-[17px] leading-relaxed">
                Designed for high-traffic fitness centers with superior
                durability, safety, and performance.
              </p>
            </div>
          </div>

          {/* Home */}
          <div className="flex gap-6 mb-12">
            <div className="w-20 h-20 relative bg-white rounded-xl shadow-sm p-3">
              <Image
                src="/icons/home-gym-icon.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-[26px] font-anton uppercase mb-4 text-[#0F172A]">
                Home Gym Equipment
              </h3>
              <p className="text-[#475569] text-[17px] leading-relaxed">
                Compact, efficient, and professional-grade equipment for home
                fitness setups.
              </p>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-[#5B81E0] hover:bg-[#4A70C0] text-white px-10 py-4 rounded-xl font-bold text-[18px] shadow-md transition">
            Read More →
          </button>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- WHY CHOOSE US ---------------- */
const WhyChooseUsSection = () => (
  <section className="w-full bg-blue-50 py-20">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
      <div className="text-center mb-16">
        <h2 className="text-[40px] md:text-[44px] font-anton uppercase text-[#0F172A]">
          Why Choose Us
        </h2>
        <p className="text-[#64748B] text-[20px] mt-4">
          Excellence Forged Through Experience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: "/icons/experience-icon.png",
            title: "35+ Years Experience",
            desc: "Decades of expertise delivering world-class fitness equipment.",
          },
          {
            icon: "/icons/certified-icon.png",
            title: "Certified Quality",
            desc: "Among India’s first certified gym equipment manufacturers.",
          },
          {
            icon: "/icons/commercial.png",
            title: "Commercial Grade",
            desc: "Built to withstand heavy-duty professional gym usage.",
          },
          {
            icon: "/icons/design-icon.png",
            title: "Innovative Design",
            desc: "Engineered for performance, durability, and modern aesthetics.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-8 h-[340px] flex flex-col items-center justify-center shadow hover:shadow-xl transition-all hover:-translate-y-2"
          >
            <div className="relative w-20 h-20 mb-6 bg-[#F9FAFB] rounded-xl p-3">
              <Image
                src={item.icon}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#0F172A]">
              {item.title}
            </h3>
            <p className="text-[#475569] text-center">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- HOME PAGE ---------------- */
export default async function HomePage() {
  const categories = await getCategories();
  console.log("HomePage categories:", categories);

  return (
    <>
      <TopHeader />
      <Navbar />

      <main className="bg-white">
        <HeroSection />
        <ExploreByCategory categories={categories} />
        <CommercialGymSection />
        <OurLatestEquipment />
        <WhyChooseUsSection />
      </main>

      <Footer />
    </>
  );
}
