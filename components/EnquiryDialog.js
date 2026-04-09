"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EnquiryDialog({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
  });

  const [open, setOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.city) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit(form);
    setOpen(false);
    onClose();
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="bg-white text-black border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Enter Your Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name*
            </label>
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="John Doe"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number*
            </label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="9876543210"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">
              City*
            </label>
            <Input
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              placeholder="Mumbai"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
