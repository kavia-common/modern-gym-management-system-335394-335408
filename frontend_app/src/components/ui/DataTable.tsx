"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

/**
 * DataTable - Generic table component with search, pagination, and sorting.
 *
 * Contract:
 * - data: array of objects
 * - columns: column definitions with optional render functions
 * - searchKey: field to search on
 * - pageSize: items per page (default 8)
 * - onRowClick: callback when a row is clicked
 */
// PUBLIC_INTERFACE
export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchKey,
  pageSize = 8,
  onRowClick,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = [...data];
    if (search && searchKey) {
      const term = search.toLowerCase();
      result = result.filter((item) => {
        const val = item[searchKey];
        return typeof val === "string" && val.toLowerCase().includes(term);
      });
    }
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        return 0;
      });
    }
    return result;
  }, [data, search, searchKey, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-xs">
      {/* Search */}
      {searchKey && (
        <div className="p-4 sm:p-5 border-b border-[var(--color-divider)]">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all duration-200"
              aria-label="Search table"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-divider)] bg-[var(--color-hover)]/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 sm:px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${col.sortable ? "cursor-pointer select-none hover:text-[var(--color-text)] transition-colors" : ""}`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span aria-hidden="true" className="text-[var(--color-accent)]">{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-divider)]">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Search size={32} className="text-[var(--color-text-muted)] opacity-50" />
                    <p className="text-sm text-[var(--color-text-muted)]">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((item, idx) => (
                <tr
                  key={(item as Record<string, unknown>).id as string || idx}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  className={`transition-colors duration-150
                    ${onRowClick ? "cursor-pointer hover:bg-[var(--color-hover)]" : ""}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 sm:px-5 py-3.5 text-[var(--color-text)]">
                      {col.render ? col.render(item) : String(item[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-t border-[var(--color-divider)] bg-[var(--color-hover)]/30">
          <p className="text-xs text-[var(--color-text-muted)]">
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(0)}
              disabled={page === 0}
              className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="First page"
            >
              <ChevronsLeft size={15} />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-xs px-3 py-1 rounded-lg bg-[var(--color-hover)] text-[var(--color-text-secondary)] font-medium">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Last page"
            >
              <ChevronsRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
