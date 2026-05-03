import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "User Section",
  description: "User dashboard and profile area",
};

export default function UserLayout({ children }) {
  return (
    <div className="flex bg-gray-50 text-gray-900 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white text-gray-900">{children}</main>
    </div>
  );
}