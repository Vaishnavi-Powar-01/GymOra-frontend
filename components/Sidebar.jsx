"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/user/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/user/enquiry", label: "Enquiry", icon: "💬" },
  { href: "/user/updateprofile", label: "Update Profile", icon: "📝" },
  { href: "/user/addresses", label: "Add Address", icon: "🏠" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white text-gray-800 min-h-screen px-6 py-6 flex flex-col
          border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Gymora Brand (Text Logo) */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-extrabold text-blue-600 hover:text-blue-700 transition"
          >
            Gymora
          </Link>
          <p className="text-sm text-gray-500 mt-1">User Panel</p>
        </div>

        {/* Links */}
        <ul className="space-y-2 flex-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200
                    ${
                      active
                        ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center w-full p-3 rounded-lg
          bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
        >
          <span className="mr-3">🔓</span>
          Logout
        </button>
      </aside>
    </>
  );
}
