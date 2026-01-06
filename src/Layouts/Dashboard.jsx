import { Scissors } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <header className="bg-white border-b border-gray-200 px-8 py-4 container mx-auto">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white font-semibold"
          >
            <Scissors />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Fashion Collection Studio
            </h1>
            <p className="text-sm text-gray-500">Tech Pack & BOM Generator</p>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
