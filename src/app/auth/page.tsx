"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const queryString = window.location.search;

        // ✅ Send data as query string (GET request)
        const response = await axios.get(`/api/auth${queryString}`, {
          withCredentials: true,
        });

        // ✅ Save Telegram user id in localStorage
        localStorage.setItem("uid", response.data.id);

        // ✅ Redirect to dashboard
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        router.push("/");
      }
    };

    handleAuth();
  }, [router]);

  return <p>Logging you in...</p>;
}

export default AuthPage;
