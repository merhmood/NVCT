"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const authData = Object.fromEntries(params.entries());

        // ✅ Send auth data to backend
        const response = await axios.post(
          "/api/auth",
          { withCredentials: true },
          authData
        );

        // ✅ Save Telegram user id in localStorage
        localStorage.setItem("uid", response.data.uid);

        // ✅ Redirect to dashboard
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        // ✅ Redirect to dashboard
        router.push("/");
      }
    };

    handleAuth();
  }, [router]);

  return <p>Logging you in...</p>;
}

export default AuthPage;
