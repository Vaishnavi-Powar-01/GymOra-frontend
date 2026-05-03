"use client";

import { useState } from "react";
import EnquiryDialog from "@/components/EnquiryDialog";
import CategoryPage from "./CategoryPage";
import ProductSelection from "./ProductSelection";
import SummaryPage from "./SummaryPage";

export default function EnquiryPage() {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [enquiryType, setEnquiryType] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(true);

  const resetForm = () => {
    setStep(1);
    setUserInfo(null);
    setEnquiryType(null);
    setSelectedProducts([]);
    setDialogVisible(true);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen p-6">
      {step > 1 && (
        <button 
          onClick={() => setStep(prev => prev - 1)}
          className="mb-4 text-blue-600 hover:text-blue-500 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      )}

      {/* Step 1 – Enquiry Dialog */}
      {step === 1 && (
        <EnquiryDialog
          onSubmit={(info) => {
            setUserInfo(info);
            setStep(2);
            setDialogVisible(false);
          }}
          onClose={() => {
            setDialogVisible(false);
          }}
        />
      )}

      {/* Step 2 – Enquiry Type */}
      {step === 2 && (
        <CategoryPage
          onSelect={(type) => {
            setEnquiryType(type);
            setStep(3);
          }}
        />
      )}

      {/* Step 3 – Product Selection */}
      {step === 3 && (
        <ProductSelection
          enquiryType={enquiryType}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          goNext={() => setStep(4)}
        />
      )}

      {/* Step 4 – Summary */}
      {step === 4 && (
        <SummaryPage
          userInfo={userInfo}
          selectedProducts={selectedProducts}
          enquiryType={enquiryType}
          onReset={resetForm}
        />
      )}
    </div>
  );
}