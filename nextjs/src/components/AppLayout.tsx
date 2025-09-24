'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Key,
  Files,
  ListTodo,
} from 'lucide-react';

import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPASassClient } from '@/lib/supabase/client';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useGlobal();

  const handleLogout = async () => {
    try {
      const client = await createSPASassClient();
      await client.logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const handleChangePassword = async () => {
    router.push('/app/user-settings');
  };

  const getInitials = (email: string) => {
    const parts = email.split('@')[0].split(/[._-]/);
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  };

  const productName = process.env.NEXT_PUBLIC_PRODUCTNAME;

  const navigation = [
    { name: 'Homepage', href: '/app', icon: Home },
    { name: 'Example Storage', href: '/app/storage', icon: Files },
    { name: 'Example Table', href: '/app/table', icon: ListTodo },
    { name: 'User Settings', href: '/app/user-settings', icon: User },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-card shadow-lg transform transition-transform duration-200 ease-in-out z-30
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border">
          <span className="text-xl font-semibold text-primary-600">
            {productName}
          </span>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? 'text-primary-500'
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex items-center justify-between h-16 bg-card shadow-sm px-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 text-sm text-foreground hover:text-foreground"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-700 font-medium">
                    {user ? getInitials(user.email) : '??'}
                  </span>
                </div>
                <span>{user?.email || 'Loading...'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-card rounded-md shadow-lg border">
                  <div className="p-2 border-b border">
                    <p className="text-xs text-muted-foreground">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleChangePassword();
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      <Key className="mr-3 h-4 w-4 text-muted-foreground" />
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-4 w-4 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
