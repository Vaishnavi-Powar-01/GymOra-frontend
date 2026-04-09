"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SummaryPage({ userInfo, selectedProducts, enquiryType, onReset }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = selectedProducts.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const submitEnquiry = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseURL}/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          city: userInfo.city,
          enquiryType,
          products: selectedProducts.map(p => ({
            name: p.name,
            price: p.price,
            quantity: p.quantity
          })),
          userId: localStorage.getItem('userId')
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      setSubmitted(true);

      toast.success("Enquiry Submitted Successfully!");
    } catch (err) {
      setError(err.message || "Failed to submit enquiry");
      toast.error("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };
 console.log("Selected products",selectedProducts);
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Enquiry Summary", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${userInfo?.name || "N/A"}`, 14, 40);
    doc.text(`Phone: ${userInfo?.phone || "N/A"}`, 14, 48);
    doc.text(`City: ${userInfo?.city || "N/A"}`, 14, 56);
    doc.text(`Enquiry Type: ${enquiryType || "N/A"}`, 14, 64);

    autoTable(doc, {
      startY: 80,
      head: [["Product", "Qty", "Price (Rs)", "Total (Rs)"]],
      body: selectedProducts.map(item => [
        item.name,
        item.quantity || 1,
        `Rs ${ (item.price || 0).toLocaleString("en-IN") }`,
        `Rs ${ ((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN") }`
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 4,
        valign: "middle"
      },
      headStyles: {
        fillColor: [30, 30, 30],
        textColor: [255, 255, 255],
        fontStyle: "bold"
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 20, halign: "center" },
        2: { cellWidth: 30, halign: "right" },
        3: { cellWidth: 30, halign: "right" }
      }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs ${total.toLocaleString("en-IN")}`, 14, finalY);

    doc.save(`Enquiry-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Enquiry Summary</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{userInfo?.name || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium">{userInfo?.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">City</p>
            <p className="font-medium">{userInfo?.city || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600">Enquiry Type</p>
            <p className="font-medium">{enquiryType || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Selected Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left pb-2">Product</th>
                <th className="text-center pb-2">Qty</th>
                <th className="text-right pb-2">Price</th>
                <th className="text-right pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((item) => (
                <tr key={item._id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image
                          src={`${baseURL}${item.image || "/product-placeholder.jpg"}`}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{item.quantity || 1}</td>
                  <td className="text-right">₹{(item.price || 0).toLocaleString("en-IN")}</td>
                  <td className="text-right">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right pt-4 font-bold">Total:</td>
                <td className="text-right pt-4 font-bold text-green-700">
                  ₹{total.toLocaleString("en-IN")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        {!submitted ? (
          <>
            <Button
              onClick={generatePDF}
              variant="outline"
              className="px-6 py-3 border-gray-300 hover:bg-gray-100"
            >
              Download PDF
            </Button>
            <Button
              onClick={submitEnquiry}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={generatePDF}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Download PDF Again
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="px-6 py-3 border-gray-300 hover:bg-gray-100"
            >
              Start New Enquiry
            </Button>
          </>
        )}
      </div>
    </div>
  );
}