import { useState } from "react";
import LightTable from "../component";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const LightTablePage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "inactive" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Editor", status: "active" },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "inactive" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">LightTable Demo</h2>
      <p className="text-gray-500 dark:text-gray-400">A lightweight table component with customizable columns and row actions.</p>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Table</h3>
          <LightTable
            data={users}
            className="w-full border-collapse"
            headerClassName="bg-gray-100 dark:bg-gray-800"
            columnClassName="text-left p-3 border-b"
            rowClassName="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            cellClassName="p-3 border-b"
            keyColumns={{
              name: {
                label: "Name",
                cellComponent: (cell) => <span className="font-medium">{cell}</span>,
              },
              email: {
                label: "Email",
                cellComponent: (cell) => <span className="text-blue-500">{cell}</span>,
              },
              role: {
                label: "Role",
                cellComponent: (cell) => <span>{cell}</span>,
              },
            }}
            onRowClick={(row) => setSelectedUser(row)}
          />
          {selectedUser && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected: {selectedUser.name} ({selectedUser.email})
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Table with Custom Columns</h3>
          <LightTable
            data={users}
            className="w-full border-collapse"
            headerClassName="bg-gray-100 dark:bg-gray-800"
            columnClassName="text-left p-3 border-b"
            rowClassName="hover:bg-gray-50 dark:hover:bg-gray-700"
            cellClassName="p-3 border-b"
            keyColumns={{
              name: {
                label: "User",
                cellComponent: (cell, row) => (
                  <div className="flex flex-col">
                    <span className="font-medium">{cell}</span>
                    <span className="text-xs text-gray-500">{row.email}</span>
                  </div>
                ),
              },
              role: {
                label: "Role",
                cellComponent: (cell) => <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{cell}</span>,
              },
            }}
            customColumns={{
              status: {
                label: "Status",
                cellComponent: (row) => (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      row.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {row.status}
                  </span>
                ),
              },
              actions: {
                label: "Actions",
                cellComponent: (row) => (
                  <div className="flex gap-2">
                    <button
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Edit ${row.name}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Delete ${row.name}`);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Table with Row Condition (Active Users Only)</h3>
          <LightTable
            data={users}
            className="w-full border-collapse"
            headerClassName="bg-green-100 dark:bg-green-900"
            columnClassName="text-left p-3 border-b"
            rowClassName="hover:bg-green-50 dark:hover:bg-green-800"
            cellClassName="p-3 border-b"
            keyColumns={{
              name: {
                label: "Name",
                cellComponent: (cell) => <span>{cell}</span>,
              },
              email: {
                label: "Email",
                cellComponent: (cell) => <span>{cell}</span>,
              },
              status: {
                label: "Status",
                cellComponent: (cell) => <span className="px-2 py-1 text-xs rounded-full bg-green-200 text-green-800">{cell}</span>,
              },
            }}
            rowShowCondition={(row) => row.status === "active"}
          />
        </div>
      </div>
    </div>
  );
};

export default LightTablePage;
