import React from 'react';
import { X, Mail, Phone, Globe, MapPin, Building } from 'lucide-react';

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-500">@{user.username}</p>
          </div>
        </div>

        <div className="space-y-3 text-slate-600 text-sm border-t pt-4">
          <p className="flex items-center gap-3"><Mail size={16} className="text-blue-500" /> {user.email}</p>
          <p className="flex items-center gap-3"><Phone size={16} className="text-blue-500" /> {user.phone}</p>
          <p className="flex items-center gap-3"><Globe size={16} className="text-blue-500" /> <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">{user.website}</a></p>
          <p className="flex items-center gap-3"><MapPin size={16} className="text-blue-500" /> {user.address.city}, {user.address.street}</p>
          <p className="flex items-center gap-3"><Building size={16} className="text-blue-500" /> {user.company.name}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-slate-900 text-white py-2.5 rounded-xl font-medium hover:bg-slate-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}