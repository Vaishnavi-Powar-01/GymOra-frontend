
import React from "react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

async function getUserData(slug) {
  try {
    const res = await fetch(`${baseURL}/users/slug/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export default async function UserDetailsPage({ params }) {
  const { slug } = params;
  const user = await getUserData(slug);

  if (!user) {
    return (
      <div className="p-10 text-black bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">User not found</h1>
        <p className="mt-2">No user with slug: <code>{slug}</code></p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6">User Details: {user.name}</h1>

      <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>ID:</strong> {user._id}</p>
      </div>
    </div>
  );
}
