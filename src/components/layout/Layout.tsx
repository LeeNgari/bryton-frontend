import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  const menuItems = [
    { to: '/', label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-50 text-black transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Logo and close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbtRyTkNW9R9aL4_vOc-PrFtALIgllAibHxs6NHIgdGqqg2QcBsZZijHU&s"
                alt="Logo"
                className="h-8"
              />
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-black hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-gray-200'
                    }`
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* User info and logout */}
            <div className="p-4 border-t border-gray-200">
              <div className="mb-3 px-4">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-sm font-medium">{user?.username}</p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-gray-50 border-b border-gray-200 px-4 py-4 lg:px-6 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-black hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-black">Dashboard</h2>
            <div className="w-6 lg:hidden" /> {/* Spacer */}
          </header>

          {/* Main area */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};
