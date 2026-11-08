import React from 'react';
import { useFavoriteStore } from '../store/useFavoriteStore';
import { Heart, Users } from 'lucide-react';

export default function Navbar({ totalUsers }) {
  const { favorites } = useFavoriteStore();

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">User Management App</h1>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full text-sm">
            <Users size={16} className="text-blue-400" />
            <span>Total: <strong>{totalUsers}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full text-sm">
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>Favorites: <strong>{favorites.length}</strong></span>
          </div>
        </div>
      </div>
    </nav>
  );
}