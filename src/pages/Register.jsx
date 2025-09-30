import React from 'react';

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.hash = '#/login';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center px-4 pt-4">
          <a href="#/news" className="text-sm text-blue-900">News</a>
          <div className="space-x-3">
            <a href="#/reporter" className="text-sm text-blue-900">Reporter</a>
            <a href="#/admin" className="text-sm text-blue-900">Admin</a>
          </div>
        </div>
        <div className="flex justify-center items-center p-6 bg-gray-900 text-white">
          <i className="fas fa-newspaper text-yellow-500 text-3xl mr-3"></i>
          <h1 className="font-bold text-2xl">KOSMO MEDIA</h1>
        </div>
        <div className="flex border-b border-gray-200">
          <span className="flex-1 py-4 text-center border-b-4 border-yellow-500 text-yellow-500 font-medium">Register</span>
        </div>
        <div className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-500 mb-2">Full Name</label>
              <input className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-gray-500 mb-2">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-gray-500 mb-2">Username</label>
              <input className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-gray-500 mb-2">Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label className="block text-gray-500 mb-2">Confirm Password</label>
              <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <button className="w-full py-2 bg-yellow-500 text-white rounded">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
