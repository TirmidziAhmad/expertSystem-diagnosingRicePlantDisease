/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { FC } from 'react';

type ProtectedRouteProps = {
  [key: string]: any;
};

const ProtectedRoute = (WrappedComponent: FC<ProtectedRouteProps>) => {
  const RequiresAuth: FC<ProtectedRouteProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');

      if (!token) {
        // If no token is found, redirect to the login page
        router.push('/login');
      }
    }, [router]);

    // Render nothing if the token is not validated yet
    const token = Cookies.get('token');
    if (!token) return null;

    // Render the wrapped component if the user is authenticated
    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default ProtectedRoute;
