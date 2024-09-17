import React from "react";

interface DataTableProps {
  columns: Array<{ header: string; accessor: string }>;
  data: Array<any>;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const getValue = (item: any, accessor: string) => {
    const keys = accessor.split(".");
    return keys.reduce((value, key) => value && value[key], item);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-black shadow-md">
      <table className="min-w-full bg-white divide-y divide-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="py-3 px-6 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="py-3 px-6 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {getValue(item, col.accessor)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-3 px-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
