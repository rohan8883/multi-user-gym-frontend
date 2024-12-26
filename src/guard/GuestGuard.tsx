import { Navigate } from 'react-router-dom';
import { useStore } from '@/store';
import { useEffect } from 'react';
import Spinner from '@/components/loaders/Spinner';

// ----------------------------------------------------------------------

export default function GuestGuard({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isInitialized, initialize } = useStore();
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/gym-app/home" />;
  }

  return <>{children}</>;
}
