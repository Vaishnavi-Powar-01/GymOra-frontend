"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopHeader from "@/components/TopHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.subject) newErrors.subject = "Select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Something went wrong");
      toast.success("Message sent! We’ll get back to you soon 😊");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen">
      <TopHeader />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-blue-600">Gymora</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            We’re here to help you move better, feel stronger, and live healthier.
            Reach out anytime 💙
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

              <div className="space-y-4">
                <p><strong>Email:</strong> info@gymora.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p>
                  <strong>Address:</strong><br />
                  Gymora Fitness Studio,<br />
                  Baner Road, Pune,<br />
                  Maharashtra, India
                </p>
                <p><strong>Hours:</strong> Mon – Sat, 6 AM – 10 PM</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-4">Follow Gymora</h3>
              <div className="flex gap-4 text-xl">
                <span>📘</span>
                <span>📸</span>
                <span>🐦</span>
                <span>💼</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Send a Message</h2>
            <p className="text-gray-600 mb-6">
              Have a question or want to join Gymora? Just drop us a message.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              >
                <option value="">Select Subject</option>
                <option value="membership">Membership</option>
                <option value="training">Personal Training</option>
                <option value="general">General Question</option>
              </select>
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject}</p>
              )}

              <textarea
                name="message"
                rows="4"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
