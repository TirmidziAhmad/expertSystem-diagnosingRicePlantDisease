import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// Define proper types
type WrappedComponentProps = Record<string, unknown>;

const protectedRoute = (WrappedComponent: React.ComponentType<WrappedComponentProps>, allowedRoles: string[]) => {
  const Wrapper = (props: WrappedComponentProps) => {
    const router = useRouter();

    useEffect(() => {
      // Move authentication check to a separate function
      const checkAuth = async () => {
        const role = Cookies.get("role");
        const userId = Cookies.get("userId");

        if (!role || !userId) {
          console.log("Missing authentication credentials");
          await router.replace("/login");
          return;
        }

        if (!allowedRoles.includes(role)) {
          console.log(`User role ${role} not authorized for this route`);
          await router.replace("/unauthorized");
          return;
        }
      };

      // Only run auth check after router is ready and if we're on client side
      if (typeof window !== "undefined" && router.isReady) {
        checkAuth();
      }
    }, [router, router.isReady]);

    // Server-side and initial client-side render
    if (typeof window === "undefined" || !router.isReady) {
      return null;
    }

    // Check authentication synchronously for subsequent renders
    const role = Cookies.get("role");
    const userId = Cookies.get("userId");
    const isAuthorized = role && userId && allowedRoles.includes(role);

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Optional: Set display name for debugging
  Wrapper.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return Wrapper;
};

export default protectedRoute;
