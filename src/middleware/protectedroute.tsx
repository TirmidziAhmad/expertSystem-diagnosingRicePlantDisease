import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type WrappedComponentProps = Record<string, unknown>;

const protectedRoute = (
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
  allowedRoles: string[]
) => {
  const Wrapper = (props: WrappedComponentProps) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = () => {
        const role = Cookies.get("role");
        const userId = Cookies.get("userId");

        if (!role || !userId) {
          console.log("Missing authentication credentials");
          router.replace("/login");
          return false;
        }

        if (!allowedRoles.includes(role)) {
          console.log(`User role ${role} not authorized for this route`);
          router.replace("/unauthorized");
          return false;
        }

        return true;
      };

      if (router.isReady) {
        setIsAuthorized(checkAuth());
      }
    }, [router, router.isReady]);

    if (isAuthorized === null) {
      // Return a loading state or null during initial check
      return null;
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return Wrapper;
};

export default protectedRoute;
