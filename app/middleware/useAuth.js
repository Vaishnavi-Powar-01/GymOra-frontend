

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function useAuth(expectedRole) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');

      // No token found — redirect
      if (!token) {
        setAuthorized(false);
        router.replace('/login');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const userRole = decoded?.role;

        // If role is not valid or mismatched — redirect
        if (!userRole || userRole !== expectedRole) {
          setAuthorized(false);
          router.replace('/login');
          return;
        }

        // Protect against manual URL entry (role-based routes)
        if (expectedRole === 'admin' && pathname.includes('/user')) {
          setAuthorized(false);
          router.replace('/login');
          return;
        }

        if (expectedRole === 'user' && pathname.includes('/admin')) {
          setAuthorized(false);
          router.replace('/login');
          return;
        }

        // All checks passed
        setAuthorized(true);
      } catch (err) {
        console.error('Token decode error:', err);
        setAuthorized(false);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [expectedRole, pathname, router]);

  return { authorized, loading };
}
