"use client";
import React, { useState } from "react";
import { Search, Plus, MoreVertical, FileText, X } from "lucide-react";
import Link from "next/link";
import {
  useCloneFashionTechpackMutation,
  useDeleteFashionTechpackMutation,
  useGetAllFashionTechpacksQuery,
  useLazyGetFashionTechpackByIdQuery,
} from "@/Apis/Get-Fashion/getFashionApi";
import { useRouter } from "next/navigation";
import { useCreateInitialFashionLibraryMutation } from "@/Apis/Poast-a-fashion/postAFashionApi";
import { toast } from "react-toastify";
import Pagination from "@/Libs/Pagination/Pagination";

const TechPackLibrary = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRouter();
  ////////////// all api call here ///////////////

  const { data: techPacks = [] } = useGetAllFashionTechpacksQuery();
  const [createInitialFashion, { isLoading }] =
    useCreateInitialFashionLibraryMutation();
  const [deleteFashionTechpack] = useDeleteFashionTechpackMutation();
  const [cloneFashionLibrary] = useCloneFashionTechpackMutation();
  const [getFashionTechpackById] = useLazyGetFashionTechpackByIdQuery();
  //////////---------------------------------------------/////

  const handleCreateInitialFashion = async () => {
    try {
      const res = await createInitialFashion().unwrap();
      toast.success("New tech pack created successfully!");
      route.push(`/${res?.id}`);
    } catch (error) {
      toast.error("Failed to create initial fashion.");
      console.error("Error creating initial fashion:", error);
    }
  };

  const handleDeleteFashionTechpack = async (id) => {
    try {
      await deleteFashionTechpack(id).unwrap();
      toast.success("Tech pack deleted successfully!");
      setActiveMenu(null);
    } catch (error) {
      toast.error("Failed to delete tech pack.");
      console.error("Error deleting tech pack:", error);
    }
  };
  const handleCloneFashionLibrary = async (id) => {
    try {
      await cloneFashionLibrary(id).unwrap();
      toast.success("Tech pack cloned successfully!");
      setActiveMenu(null);
    } catch (error) {
      toast.error("Failed to clone tech pack.");
      console.error("Error cloning tech pack:", error);
    }
  };

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };


  const handleExportPDF = async (id) => {
    try {
      const res = await getFashionTechpackById(id).unwrap();
      if (res?.pdf_url) {
        window.open(res?.pdf_url, "_blank");
      }
    } catch (error) {
      console.error("Error exporting tech pack:", error);
    }
  }

  // Filter tech packs based on search query
  const filteredTechPacks = techPacks.filter(
    (pack) =>
      pack?.style_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack?.garment_type?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  /////// pagination

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const totalPages = Math.ceil(filteredTechPacks.length / usersPerPage);

  // Calculate the current page's patients
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentTechPacks = filteredTechPacks.slice(
    startIndex,
    startIndex + usersPerPage,
  );

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Tech Pack Library
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Manage and organize your fashion tech packs
        </p>
      </div>

      {/* Search and Create Button */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by style code or garment type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          onClick={handleCreateInitialFashion}
          className="bg-gray-900 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          <Plus className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Create New Tech Pack</span>
          <span className="sm:hidden">Create New</span>
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Style Code
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Garment Type
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Version
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTechPacks.length > 0 ? (
              currentTechPacks.map((pack) => (
                <tr
                  key={pack.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {pack.style_code || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {pack.garment_type || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <span className="text-sm">{pack.version || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {pack.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
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
                      {new Intl.DateTimeFormat("default", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(pack.created_at)) || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(pack.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {activeMenu === pack.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveMenu(null)}
                          />
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                            <button
                              onClick={() => route.push(`/${pack.id}/review`)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Open
                            </button>
                            <button
                              onClick={() => handleCloneFashionLibrary(pack.id)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Duplicate
                            </button>
                            <button onClick={() => handleExportPDF(pack.id)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Export PDF
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteFashionTechpack(pack.id)
                              }
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No tech packs found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentTechPacks.length > 0 ? (
          currentTechPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-gray-900">
                    {pack.style_code || "N/A"}
                  </span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(pack.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {activeMenu === pack.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                        <button
                          onClick={() => route.push(`/${pack.id}/review`)}
                          className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => handleCloneFashionLibrary(pack.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Duplicate
                        </button>
                        <button onClick={() => handleExportPDF(pack.id)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Export PDF
                        </button>
                        <button
                          onClick={() => handleCloneFashionLibrary(pack.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Garment Type</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {pack.garment_type || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Version</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="text-sm">{pack.version || "N/A"}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status</span>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {pack.status || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg
                      className="w-4 h-4"
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
                    <span className="text-sm">{pack.updated_at || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              No tech packs found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

export default TechPackLibrary;
