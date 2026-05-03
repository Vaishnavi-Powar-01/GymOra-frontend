import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

async function getProduct(slug) {
  try {
    const url = `${baseURL}/products/slug/${slug}?populate=category`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }) {
  const slug = params?.slug;
  console.log("Slug:", slug);

  if (!slug) return notFound();

  const product = await getProduct(slug);

  if (!product) return notFound();

  return (
    <>
      <TopHeader />
      <Navbar />

      {/* ✅ BANNER using Next.js Image */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/products-image.png"
          alt="Products Banner"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Product</h1>
        </div>
      </section>
      {/* Breadcrumb */}
      <div className="px-6 py-4 text-sm bg-gray-100 border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-gray-700">
          <Link
            href="/"
            className="text-black hover:text-blue-400 hover:underline"
          >
            Home
          </Link>{" "}
          &nbsp;/&nbsp;
          <Link
            href="/products"
            className="text-black hover:text-blue-400 hover:underline"
          >
            Products
          </Link>{" "}
          &nbsp;/&nbsp;
          <span className="text-blue-600 dark:text-blue-600">
            {product.name}
          </span>
        </div>
      </div>

     <main className="max-w-6xl mx-auto px-4 py-10">
  <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden p-6">
    
    <div className="grid md:grid-cols-2 gap-10 items-start">
      
      {/* LEFT SIDE - IMAGE */}
      <div className="relative w-full h-[400px] bg-gray-50 rounded-xl overflow-hidden">
        {product.image ? (
          <Image
            src={
              product.image.startsWith("http")
                ? product.image
                : `${baseURL}/${product.image.replace(/^\/+/, "")}`
            }
            alt={product.name}
            fill
            className="object-contain p-6"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* RIGHT SIDE - PRODUCT INFO */}
      <div className="space-y-6">
        <h1 className="mt-5 text-3xl font-bold text-blue-600">
          {product.name}
        </h1>

        <p className="text-gray-700 text-lg">
          <strong>Category:</strong>{" "}
          {product.category?.name || "Uncategorized"}
        </p>

      

        <div className="grid grid-cols-3 gap-4 text-gray-700">
          <p><strong>Length:</strong> {product.length} cm</p>
          <p><strong>Width:</strong> {product.width} cm</p>
          <p><strong>Height:</strong> {product.height} cm</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
          <p className="mt-5 text-green-600 font-bold text-2xl">
          ₹{product.price}
        </p>
        </div>
      </div>

    </div>
  </div>
</main>


      <Footer />
    </>
  );
}
