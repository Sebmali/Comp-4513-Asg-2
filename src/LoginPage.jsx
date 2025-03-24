import React from "react";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      {/* Top Heading */}
      <header className="mt-8">
        <h1 className="text-2xl font-bold text-black">Your Application Name</h1>
      </header>

      {/* Centered Form */}
      <main className="flex-1 flex items-center justify-center w-full">
        <form className="bg-gray-200 p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
            >
              Login
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
            >
              Register
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="mb-4">
        <p className="italic text-sm text-black">Hero image credit</p>
      </footer>
    </div>
  );
};

export default LoginPage;
