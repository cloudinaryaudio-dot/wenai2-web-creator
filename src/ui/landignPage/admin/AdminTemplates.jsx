import React, { useState } from 'react';

/**
 * AdminTemplates Component
 * 
 * Displays all wedding invitation templates created.
 * Features:
 * - List all templates with metadata
 * - Dummy Edit, Update, Delete buttons per template
 * - Responsive design with scroll for narrow screens
 */
export default function AdminTemplates() {
  // Dummy templates data
  const [templates, setTemplates] = useState([
    { id: 1, name: "Royal Indian", category: "Traditional", price: "₹15,999", status: "Published" },
    { id: 2, name: "Modern Instagram", category: "Modern", price: "₹12,999", status: "Draft" },
    { id: 3, name: "Dreamscape", category: "Fantasy", price: "₹18,499", status: "Published" },
    { id: 4, name: "Minimalist", category: "Simple", price: "₹9,999", status: "Archived" }
  ]);

  // Dummy handlers
  const handleEdit = (id) => {
    alert(`Edit template ID: ${id} (dummy action)`);
  };
  const handleUpdate = (id) => {
    alert(`Update template ID: ${id} (dummy action)`);
  };
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this template?");
    if (confirmed) {
      alert(`Deleted template ID: ${id} (dummy action)`);
      // For demonstration only; no actual deletion for now
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
          Template Management
        </h2>
        <button 
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition duration-300"
          onClick={() => alert("Add new template (dummy)")}
          aria-label="Add new template"
        >
          Add New Template
        </button>
      </div>

      {/* Template Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
        <table className="w-full table-auto" role="table" aria-label="Templates management table">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 uppercase tracking-wide">Name</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 uppercase tracking-wide">Category</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 uppercase tracking-wide">Price</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700 uppercase tracking-wide">Status</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-700 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {templates.map(template => (
              <tr key={template.id} className="hover:bg-blue-50 transition-colors cursor-default">
                <td className="px-6 py-5 text-gray-900 font-semibold">{template.name}</td>
                <td className="px-6 py-5 text-gray-700">{template.category}</td>
                <td className="px-6 py-5 text-gray-700">{template.price}</td>
                <td className={`px-6 py-5 font-semibold ${
                  template.status === 'Published' ? 'text-green-600' :
                  template.status === 'Draft' ? 'text-yellow-600' :
                  'text-gray-500'
                }`}>
                  {template.status}
                </td>
                <td className="px-6 py-5 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(template.id)}
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                    aria-label={`Edit template ${template.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleUpdate(template.id)}
                    className="px-3 py-1 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition"
                    aria-label={`Update template ${template.name}`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="px-3 py-1 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition"
                    aria-label={`Delete template ${template.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
