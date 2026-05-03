"use client";

import { Button } from "@/components/ui/button";

export default function CategoryPage({ onSelect }) {
  const enquiryTypes = [
    {
      id: "bulk",
      title: "Bulk Order",
      description: "Purchase multiple items in quantity"
    },
    {
      id: "full-gym",
      title: "Full Gym Setup",
      description: "Complete gym equipment package"
    },
    {
      id: "single",
      title: "Single Equipment",
      description: "Individual fitness equipment"
    },
    {
      id: "franchise",
      title: "Franchise Inquiry",
      description: "Business partnership opportunities"
    },
    {
      id: "other",
      title: "Others",
      description: "Custom requirements"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">What would you like to enquire about?</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enquiryTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => onSelect(type.id)}
              className="border border-gray-300 rounded-lg p-6 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}