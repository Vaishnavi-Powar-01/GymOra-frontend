"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye } from "lucide-react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();

  const fetchEnquiries = async () => {
    const res = await fetch(`${baseURL}/enquiry`);
    const data = await res.json();
    setEnquiries(data);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `${baseURL}/enquiry/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setEnquiries((prev) =>
          prev.map((enq) =>
            enq._id === id ? { ...enq, status: updated.status } : enq
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Update error", error);
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch = 
      enq.name?.toLowerCase().includes(search.toLowerCase()) ||
      enq.phone?.includes(search) ||
      enq.city?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || enq.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    All: enquiries.length,
    Pending: enquiries.filter(e => e.status === "Pending").length,
    Approved: enquiries.filter(e => e.status === "Approved").length,
    Rejected: enquiries.filter(e => e.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Enquiries</h1>
          <p className="text-gray-600">Manage customer enquiries and follow-ups</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div 
              key={status} 
              className={`bg-white p-4 rounded-xl border ${statusFilter === status ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'} shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md`}
              onClick={() => setStatusFilter(status)}
            >
              <p className="text-sm text-gray-600 mb-1">{status}</p>
              <p className="text-2xl font-bold text-gray-800">{count}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, phone, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer min-w-[150px]"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm">
            <p className="text-gray-600">No enquiries found matching your criteria.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">City</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Products</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((enq) => (
                    <tr 
                      key={enq._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td 
                        className="py-3 px-4 text-gray-800 font-medium cursor-pointer"
                        onClick={() => router.push(`/admin/enquiry/${enq._id}`)}
                      >
                        {enq.name}
                      </td>
                      <td className="py-3 px-4 text-gray-800">{enq.phone}</td>
                      <td className="py-3 px-4 text-gray-800">{enq.city}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {enq.enquiryType || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {enq.products.length} items
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                            enq.status === 'Approved'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : enq.status === 'Rejected'
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => router.push(`/admin/enquiry/${enq._id}`)}
                          className="flex items-center px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 mr-1.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredEnquiries.length} of {enquiries.length} enquiries
        </div>
      </div>
    </div>
  );
}