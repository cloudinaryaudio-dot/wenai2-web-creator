import React, { useState } from "react";

const SimpleAdminDashboard = () => {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-lg rounded-2xl bg-white/95 shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-[#4a0f0e] mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome back. Use the action below to get started.
        </p>

        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="px-6 py-3 rounded-lg bg-[#8f201a] text-white font-semibold hover:bg-[#4a0f0e] transition-colors"
        >
          Click me
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Clicked <span className="font-semibold text-[#4a0f0e]">{count}</span>{" "}
          time{count === 1 ? "" : "s"}
        </p>
      </section>
    </main>
  );
};

export default SimpleAdminDashboard;
