import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

async function getProducts() {
  const res = await fetch(`${baseURL}/products?populate=category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <TopHeader />
      <Navbar />
      
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/products-image.png"
          alt="Products Banner"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Our Products</h1>
        </div>
      </section>

      {/* Breadcrumb */}
    <div className="px-6 py-4 text-sm bg-gray-100 border-b border-gray-200">
  <div className="max-w-6xl mx-auto text-gray-700">
    <Link href="/" className="hover:text-blue-600 transition hover:underline">
      Home
    </Link>{" "}
    /{" "}
    <span className="text-blue-600 font-medium">Products</span>
  </div>
</div>

      <main className="max-w-6xl mx-auto px-4 py-10 text-black dark:text-white">
        <div className="flex justify-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 shadow-sm border-b-2 border-blue-400 pb-2">
            All Products
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="group"
            >
<Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition">
                <div
                  className="relative w-full h-60 bg-gray-50"
                >
                  {product.image ? (
                    <Image
                      src={`${baseURL}/${
                        product.image?.startsWith("/")
                          ? product.image.slice(1)
                          : product.image
                      }`}
                      alt={product.name}
                      fill
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-300">
                      No Image
                    </div>
                  )}
                </div>

                <CardHeader className="px-4 pt-4 pb-1">
                  {/* ✅ Product name color set to white */}
                  <h3 className="text-xl font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                </CardHeader>

                <CardContent className="px-4 pb-4 space-y-2">
                  {/* ✅ Category and price text adjusted for black background */}
                  <p className="text-gray-600 text-sm">
                    <strong>Category:</strong> {product.category?.name || "Uncategorized"}
                  </p>
                  <p className="text-green-600 font-bold text-lg">
                    ₹{product.price}
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
