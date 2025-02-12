"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const protectedRoute = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        const role = Cookies.get("role");
        const userId = Cookies.get("userId");

        if (!role || !userId) {
          console.log("Missing authentication credentials");
          router.push("/login");
          return;
        }

        if (!allowedRoles.includes(role)) {
          console.log(`User role ${role} not authorized for this route`);
          router.push("/unauthorized");
          return;
        }

        setIsAuthorized(true);
        setIsLoading(false);
      };

      if (router.isReady) {
        checkAuth();
      }
    }, [router, router.isReady]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default protectedRoute;
