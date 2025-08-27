"use client";

import { useState, useMemo } from "react";
import { useSimds } from "@/lib/api/hooks";
import { SimdList } from "@/components/simd/SimdList";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { SimdStatusFilter } from "@/components/filters/SimdStatusFilter";
import { Search, Download, Filter } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { SimdStatus } from "@/lib/api/types";

export default function HomePage() {
  const [statusFilter, setStatusFilter] = useState<SimdStatus | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: simds, isLoading, error } = useSimds();
  
  // Fetch details for all SIMDs to calculate stats
  const detailQueries = useQueries({
    queries: (simds || []).map((simd) => ({
      queryKey: ["simd", simd.id],
      queryFn: () => api.getSimdDetails(simd.id),
      staleTime: 60000,
    })),
  });
  
  const simdDetails = useMemo(() => {
    const details: Record<string, any> = {};
    detailQueries.forEach((query, index) => {
      if (simds && query.data) {
        details[simds[index].id] = query.data;
      }
    });
    return details;
  }, [detailQueries, simds]);
  
  const filteredSimds = useMemo(() => {
    if (!simds) return [];
    
    return simds.filter(simd => {
      const matchesStatus = statusFilter === "All" || simd.status === statusFilter;
      const matchesSearch = simd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           simd.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [simds, statusFilter, searchQuery]);
  
  const exportData = () => {
    const dataStr = JSON.stringify(filteredSimds, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `simds-export-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-gray-600 dark:text-zinc-400">Loading SIMDs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-red-500">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-zinc-300">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search SIMDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500/50 transition-colors w-64 text-sm text-gray-900 dark:text-white"
                />
              </div>
              
              {/* Export */}
              <button
                onClick={exportData}
                className="p-2 text-gray-600 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Export data"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {simds && (
          <DashboardStats simds={simds} details={simdDetails} />
        )}
        
        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <SimdStatusFilter value={statusFilter} onChange={setStatusFilter} />
            <span className="text-sm text-gray-600 dark:text-zinc-500">
              {filteredSimds.length} of {simds?.length || 0} SIMDs
            </span>
          </div>
        </div>

        {simds && <SimdList simds={filteredSimds} />}
      </div>
    </div>
  );
}