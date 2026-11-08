import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserDetailsModal from './components/UserDetailsModal';
import { useFavoriteStore } from './store/useFavoriteStore';
import { Heart, Eye, Loader2 } from 'lucide-react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const { favorites, toggleFavorite } = useFavoriteStore();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <Navbar totalUsers={users.length} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">User Directory</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <span className="ml-3 text-lg text-slate-600 font-medium">Loading users...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => {
              const isFavorite = favorites.some((fav) => fav.id === user.id);
              return (
                <div 
                  key={user.id} 
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <button
                        onClick={() => toggleFavorite(user)}
                        className={`p-2.5 rounded-full transition ${
                          isFavorite 
                            ? 'bg-red-50 text-red-500' 
                            : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Heart size={20} className={isFavorite ? 'fill-red-500' : ''} />
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800">{user.name}</h3>
                    <p className="text-sm text-slate-500 mb-1">@{user.username}</p>
                    
                    <div className="space-y-1 text-sm text-slate-600 mt-4 border-t pt-3">
                      <p>📧 {user.email}</p>
                      <p>📞 {user.phone}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedUser(user)}
                    className="mt-6 w-full bg-blue-50 text-blue-600 font-medium py-2.5 rounded-xl hover:bg-blue-100 transition flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> View Details
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <UserDetailsModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />
    </div>
  );
}