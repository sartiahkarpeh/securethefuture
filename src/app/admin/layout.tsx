'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { usePathname } from 'next/navigation';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <ProtectedRoute>
          <AdminLayout>{children}</AdminLayout>
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
