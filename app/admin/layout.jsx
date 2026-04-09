'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  X,
  LayoutDashboard,
  FolderTree,
  Package,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  LogOut,
  Home,
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      if (decoded.role !== 'admin') {
        router.replace('/login');
        return;
      }
      setAuthorized(true);
    } catch {
      router.replace('/login');
    } finally {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: '/admin/categories', label: 'Categories', icon: <FolderTree className="w-5 h-5" /> },
    { href: '/admin/products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { href: '/admin/banner', label: 'Banners', icon: <ImageIcon className="w-5 h-5" /> },
    { href: '/admin/enquiry', label: 'Enquiries', icon: <MessageSquare className="w-5 h-5" /> },
    { href: '/admin/blogs', label: 'Blogs', icon: <FileText className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <>
      {/* ================= Mobile Header ================= */}
      <div className="block md:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Gymora Brand */}
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            Gymora
          </Link>

          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg">
            <Home className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="block md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= Mobile Sidebar ================= */}
      <div
        className={`block md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <span className="mr-3 text-gray-500">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center w-full mt-4 p-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-700"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* ================= Desktop Layout ================= */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 fixed inset-y-0 left-0">
          
          {/* Brand Section */}
          <div className="p-6 border-b border-gray-200">
            <Link
              href="/"
              className="block text-2xl font-extrabold text-blue-600 hover:text-blue-700"
            >
              Gymora
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              Management Console
            </p>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600"
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full p-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-700"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 pt-16 md:pt-0">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </>
  );
}
