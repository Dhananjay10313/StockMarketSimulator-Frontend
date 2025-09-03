// LeaderboardTable.jsx
import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./LeaderboardTable.css";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const columns = [
  {
    accessorKey: "rank",
    header: () => "Rank",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "username",
    header: () => "Username",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "portfolioValue",
    header: () => "Portfolio Value",
    cell: (info) => currency.format(info.getValue()),
  },
  {
    accessorKey: "walletBalance",
    header: () => "Wallet Balance",
    cell: (info) => currency.format(info.getValue()),
  },
  {
    accessorKey: "totalValue",
    header: () => "Total Value",
    cell: (info) => currency.format(info.getValue()),
  },
];

export default function LeaderboardTable({ data = [] }) {
  const [sorting, setSorting] = useState([]);
  const memoData = useMemo(() => data, [data]);
  const memoCols = useMemo(() => columns, []);

  const table = useReactTable({
    data: memoData,
    columns: memoCols,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // client-side sorting
  });

  // LeaderboardTable.jsx (only the return block shown)
  return (
    <div className="card">
      {/* New label */}
      <h2 className="tableTitle">Leaderboard</h2>

      <div className="scrollWrap hideScrollbar">
        <table className="tbl">
          <thead className="thead">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`th ${header.column.getCanSort() ? "sortable" : ""}`}
                      aria-sort={
                        sorted
                          ? sorted === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <div className="thInner">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="sortIcon">
                          {sorted === "asc"
                            ? "▲"
                            : sorted === "desc"
                              ? "▼"
                              : "↕"}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="tr">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="td">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
