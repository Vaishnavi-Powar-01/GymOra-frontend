"use client";

import { useEffect, useState } from "react";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserDashboard() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchEnquiries = async () => {
      try {
        const res = await fetch(`${baseURL}/enquiry/user/${userId}`);
        const data = await res.json();
        setEnquiries(data);
      } catch (error) {
        console.error("Error fetching enquiries", error);
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <div className="p-6 text-gray-900 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Enquiries</h2>

      {enquiries.length === 0 ? (
        <p className="text-gray-600">No enquiries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">Date</th>
                <th className="px-4 py-2 border-b border-gray-300">Enquiry Type</th>
                <th className="px-4 py-2 border-b border-gray-300">City</th>
                <th className="px-4 py-2 border-b border-gray-300">Phone</th>
                <th className="px-4 py-2 border-b border-gray-300">Products</th>
                <th className="px-4 py-2 border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{enquiry.enquiryType}</td>
                  <td className="px-4 py-2">{enquiry.city}</td>
                  <td className="px-4 py-2">{enquiry.phone}</td>
                  <td className="px-4 py-2">
                    <ul className="list-disc ml-4">
                      {enquiry.products.map((prod, idx) => (
                        <li key={idx}>{prod.name} × {prod.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        enquiry.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : enquiry.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}