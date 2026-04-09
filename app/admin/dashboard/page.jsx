'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const slugify = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');

  // 🔐 Auth check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'admin') {
      setAuthorized(false);
      router.replace('/login');
    } else {
      setAuthorized(true);
    }
    setChecking(false);
  }, [router]);

  // 📦 Fetch data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${baseURL}/users`);
        const data = await res.json();
        setUsers(data.filter((u) => u.role !== 'admin'));
      } catch (err) {
        console.error('User fetch failed', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseURL}/products?populate=category`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Product fetch failed', err);
      }
    };

    if (authorized) {
      fetchUsers();
      fetchProducts();
    }
  }, [authorized]);

  if (checking || !authorized) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-10 text-indigo-700">
        ⚙️ Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            👥 Registered Users
          </h2>
          <p className="text-3xl font-bold text-indigo-600">
            {users.length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            📦 Total Equipments
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {products.length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          👤 Registered Users
        </h2>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Registered On</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    onClick={() =>
                      router.push(`/admin/dashboard/${user.slug}`)
                    }
                    className="border-t hover:bg-indigo-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-3 font-medium">
                      {user.name}
                    </td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">{user.phone}</td>
                    <td className="px-6 py-3">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Products Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📋 Equipments List
        </h2>

        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Added On</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No equipments found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-blue-50 transition"
                  >
                    <td className="px-6 py-3 font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-3">
                      {product.category?.name || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-3 font-semibold">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-3">
                      {product.createdAt
                        ? new Date(
                            product.createdAt
                          ).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
