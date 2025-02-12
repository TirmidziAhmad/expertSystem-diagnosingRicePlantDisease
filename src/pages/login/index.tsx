import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setCookieWithRetry = (name: string, value: string, options: Cookies.CookieAttributes): boolean => {
    try {
      // Log the exact value being set
      console.log(`Attempting to set ${name} cookie with value:`, value);

      // Ensure the value is a string
      const stringValue = String(value);

      // Set the cookie
      Cookies.set(name, stringValue, options);

      // Verify the cookie
      const storedValue = Cookies.get(name);
      console.log(`Retrieved ${name} cookie value:`, storedValue);

      if (!storedValue) {
        console.error(`Failed to set cookie: ${name}`);
        return false;
      }

      console.log(`Successfully set cookie: ${name}`);
      return true;
    } catch (err) {
      console.error(`Error setting cookie ${name}:`, err);
      return false;
    }
  };

  const handleLogin = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });

      if (response.status === 200) {
        console.log("Full login response:", response.data);

        const { user } = response.data;
        console.log("User data:", user);

        // Validate user data
        if (!user) {
          throw new Error("No user data in response");
        }

        const { userId, username, role } = user;
        console.log("Extracted values:", { userId, username, role });

        // Ensure role exists and process it
        if (!role) {
          throw new Error("Role is missing from user data");
        }

        // Process role value
        const userRole = String(role).toLowerCase().trim();
        console.log("Processed role value:", userRole);

        // Validate processed role
        if (!userRole) {
          throw new Error("Invalid role value");
        }

        // Basic cookie options
        const cookieOptions = {
          path: "/",
          expires: 1 / 24, // 1 hour
          sameSite: "lax" as const, // Try lax instead of strict
        };

        // Try setting role cookie first
        const roleSet = setCookieWithRetry("role", userRole, cookieOptions);
        if (!roleSet) {
          throw new Error("Failed to set role cookie");
        }

        // Set remaining cookies
        const userIdSet = setCookieWithRetry("userId", userId, cookieOptions);
        const usernameSet = setCookieWithRetry("username", username, cookieOptions);

        if (!userIdSet || !usernameSet) {
          throw new Error("Failed to set user cookies");
        }

        // Final verification
        const finalRole = Cookies.get("role");
        console.log("Final role cookie check:", finalRole);

        if (!finalRole) {
          throw new Error("Role cookie not persisted");
        }

        // Navigate based on role
        const redirectPath = userRole === "admin" ? "/admin/dashboard" : "/user/dashboard";
        console.log("Redirecting to:", redirectPath);
        await router.push(redirectPath);
      }
    } catch (err: any) {
      console.error("Login error:", err);

      // Specific error handling
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (err.message.includes("role")) {
        errorMessage = "Failed to set authentication role. Please check your permissions and try again.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);

      // Clear any partially set cookies on error
      try {
        Cookies.remove("role");
        Cookies.remove("userId");
        Cookies.remove("username");
      } catch (clearErr) {
        console.error("Error clearing cookies:", clearErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, password, router]);

  // Rest of the component remains the same...
  return (
    <div className="flex justify-around items-center bg-cover h-screen">
      <div className="text-olive border-beige border rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40">
        <h1 className="font-bold text-4xl text-center mb-6">Masuk</h1>
        {error && (
          <div className="text-red-600 mb-4 text-center text-sm" role="alert">
            {error}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="relative my-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-72 py-2 px-0 text-sm bg-transparent border-0 border-b border-beige focus:outline-none focus:ring-0 focus:border-blue-600"
              required
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-72 py-2 px-0 text-sm bg-transparent border-0 border-b border-beige focus:outline-none focus:ring-0 focus:border-blue-600"
              required
            />
          </div>
          <button type="submit" disabled={isLoading} className="mt-2 bg-[#352802] font-medium text-white text-center w-full px-2 py-2 rounded-md disabled:opacity-50">
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>
        <div className="flex flex-row text-sm items-center text-center justify-center mt-4 gap-1">
          <p>Apakah belum punya akun?</p>
          <p className="font-semibold text-[#352802]">
            <Link href="/register">{" Daftar disini"}</Link>
          </p>
        </div>
      </div>
      <Image src="/login-ilustration.jpg" alt="Login Illustration" width={800} height={800} className="mt-5" priority />
    </div>
  );
};

export default LoginPage;
