"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, ArrowLeft } from "lucide-react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function EnquiryDetailPage() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const res = await fetch(`${baseURL}/enquiry/${id}`);
        const data = await res.json();
        setEnquiry(data);
      } catch (error) {
        console.error("Error fetching enquiry:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEnquiry();
  }, [id]);

  // ✅ GRAND TOTAL
  const grandTotal =
    enquiry?.products?.reduce((sum, p) => {
      const price = Number(p.price || 0);
      const quantity = Number(p.quantity || 0);
      return sum + price * quantity;
    }, 0) || 0;

  // ✅ PDF
  const generatePDF = () => {
    if (!enquiry) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Enquiry Details", 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${enquiry.name}`, 14, 35);
    doc.text(`Phone: ${enquiry.phone}`, 14, 43);
    doc.text(`City: ${enquiry.city}`, 14, 51);
    doc.text(`Status: ${enquiry.status}`, 14, 59);
    doc.text(`Type: ${enquiry.enquiryType}`, 14, 67);

    autoTable(doc, {
      startY: 75,
      head: [["Product", "Qty", "Price", "Total"]],
      body: enquiry.products.map((p) => {
        const price = Number(p.price || 0);
        const qty = Number(p.quantity || 0);
        return [p.name, qty, `₹${price}`, `₹${price * qty}`];
      }),
    });

    doc.text(
      `Grand Total: ₹${grandTotal}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save("enquiry.pdf");
  };

  if (loading) return <div>Loading...</div>;
  if (!enquiry) return <div>No Data</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-2xl font-bold mb-6">Enquiry Details</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* ✅ CUSTOMER DETAILS */}
        <div className="md:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              Customer Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-medium">{enquiry.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">{enquiry.phone}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">City</p>
                <p className="font-medium">{enquiry.city}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Type</p>
                <p className="font-medium">{enquiry.enquiryType}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="font-medium">{enquiry.status}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Date</p>
                <p className="font-medium">
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* ✅ PRODUCTS TABLE */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
              Selected Products
            </h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Total</th>
                </tr>
              </thead>

              <tbody>
                {enquiry.products.map((p, i) => {
                  const price = Number(p.price || 0);
                  const qty = Number(p.quantity || 0);

                  return (
                    <tr key={i} className="border-b">
                      <td className="p-2">{p.name}</td>
                      <td className="p-2">{qty}</td>
                      <td className="p-2">₹{price}</td>
                      <td className="p-2">₹{price * qty}</td>
                    </tr>
                  );
                })}
              </tbody>

              {/* ✅ GRAND TOTAL */}
              <tfoot>
                <tr className="bg-gray-200 font-bold">
                  <td colSpan={3} className="p-2 text-right">
                    Grand Total
                  </td>
                  <td className="p-2 text-green-600">
                    ₹{grandTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ✅ ACTIONS */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <h3 className="font-semibold mb-4">Actions</h3>

          <button
            onClick={generatePDF}
            className="w-full bg-blue-600 text-white p-2 rounded mb-3"
          >
            <Download className="inline mr-2" />
            Download PDF
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-300 p-2 rounded"
          >
            <ArrowLeft className="inline mr-2" />
            Back
          </button>
        </div>

      </div>
    </div>
  );
}