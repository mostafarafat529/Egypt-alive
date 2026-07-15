export default function DataTable({ columns, data, renderActions }) {
  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center text-gray-400">
        No data found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: "700px" }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider sticky top-0 bg-gray-50 z-10"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
              {renderActions && (
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider sticky top-0 bg-gray-50 z-10" style={{ width: "160px" }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 text-gray-600 text-sm">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {renderActions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
