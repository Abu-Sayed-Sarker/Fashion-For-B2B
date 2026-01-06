import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, MoreVertical, FileText, Tag } from "lucide-react";
import { techPacks } from "../../../Data/staticData";
import { useGetAllFashionQuery } from "../../Api/allApi";
import { Link } from "react-router-dom";

const TechPackLibrary = () => {
  //// api call here

  const { data } = useGetAllFashionQuery();
  console.log("API Data:", data);

  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const filteredPacks = techPacks.filter(
    (pack) =>
      pack.styleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.garmentType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleAction = (action, pack) => {
    console.log(`${action} action for ${pack.styleCode}`);
    setOpenMenuId(null);
    // Add your action handlers here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Tech Pack Library
          </h2>
          <p className="text-gray-600">
            Manage and organize your fashion tech packs
          </p>
        </div>

        {/* Search and Create Button */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by style code or garment type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Link
            to="/add-faction-library"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Tech Pack
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Style Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Garment Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPacks.map((pack) => (
                <tr
                  key={pack.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <FileText className="w-4 h-4 text-gray-400" />
                      {pack.styleCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {pack.garmentType}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Tag className="w-4 h-4 text-gray-400" />
                      {pack.version}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${pack.statusColor}`}
                    >
                      {pack.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {pack.lastUpdated}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="relative"
                      ref={openMenuId === pack.id ? menuRef : null}
                    >
                      <button
                        onClick={() => handleMenuClick(pack.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === pack.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button
                            onClick={() => handleAction("Open", pack)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Open
                          </button>
                          <button
                            onClick={() => handleAction("Duplicate", pack)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleAction("Export PDF", pack)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Export PDF
                          </button>
                          <button
                            onClick={() => handleAction("Delete", pack)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TechPackLibrary;
