"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProductSelection({
  enquiryType,
  selectedProducts,
  setSelectedProducts,
  goNext,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseURL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const toggleProduct = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p._id === product._id);
      if (exists) {
        return prev.filter(p => p._id !== product._id);
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setSelectedProducts(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Select Products ({enquiryType})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => {
          const isSelected = selectedProducts.some(p => p._id === product._id);
          const selectedItem = selectedProducts.find(p => p._id === product._id);
          
          return (
            <div
              key={product._id}
              onClick={() => toggleProduct(product)}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                isSelected 
                  ? "ring-2 ring-blue-500 bg-blue-50 border-blue-300" 
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={`${baseURL}${product.image || "/product-placeholder.jpg"}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="font-medium">₹{product.price?.toLocaleString("en-IN")}</p>
                
                {isSelected && (
                  <div className="mt-3 flex items-center" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => updateQuantity(product._id, selectedItem.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={selectedItem.quantity}
                      onChange={(e) => updateQuantity(product._id, e.target.value)}
                      className="w-12 text-center bg-white py-1 border-t border-b border-gray-300"
                      min="1"
                    />
                    <button 
                      onClick={() => updateQuantity(product._id, selectedItem.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={goNext}
          disabled={selectedProducts.length === 0}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg text-white"
        >
          {selectedProducts.length > 0 
            ? `Continue (${selectedProducts.length} selected)` 
            : "Select products to continue"}
        </Button>
      </div>
    </div>
  );
}