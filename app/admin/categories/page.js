"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch categories
  useEffect(() => {
    fetch(`${baseURL}/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check duplicate category name
    const isDuplicate = categories.some(
      (cat) => 
        cat.name.toLowerCase().trim() === form.name.toLowerCase().trim() &&
      cat._id !== editingId //allow same when editing itself
    );

    if (isDuplicate) {
      toast.error("Category already exits");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

    const url = editingId
      ? `${baseURL}/categories/${editingId}`
      : `${baseURL}/categories`;

    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      body: data,
    });

    if (!res.ok) {
      setMessage("❌ Something went wrong");
      return;
    }

    const saved = await res.json();

    setCategories((prev) =>
      editingId
        ? prev.map((c) => (c._id === saved._id ? saved : c))
        : [...prev, saved]
    );

    setForm({ name: "", description: "", image: null });
    setPreview("");
    setEditingId(null);
    toast(editingId ? "✅ Category updated" : "✅ Category added");
  };

  // Edit
  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setForm({
      name: cat.name,
      description: cat.description,
      image: null,
    });
    setPreview(`${baseURL}${cat.imageUrl}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    const res = await fetch(`${baseURL}/categories/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast("🗑️ Category deleted");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">
          {editingId ? "Edit Category" : "Add Category"}
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 mb-10 space-y-4"
          encType="multipart/form-data"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Category Name"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          {preview && (
            <div className="relative w-full h-40 border rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain bg-white"
                unoptimized
              />
            </div>
          )}

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
            {editingId ? "Update Category" : "Add Category"}
          </button>

          {message && (
            <p className="text-center text-green-600 font-medium">
              {message}
            </p>
          )}
        </form>

        {/* LIST */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <div className="relative h-40 w-full mb-3 border rounded-lg overflow-hidden">
                <Image
                  src={`${baseURL}${cat.imageUrl}`}
                  alt={cat.name}
                  fill
                  className="object-contain bg-white"
                  unoptimized
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {cat.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(cat)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
