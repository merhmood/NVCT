"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [login, setLogin] = useState<"not-login" | "login" | "error">(
    "not-login"
  ); // not-login | login | error
  const [creators, setCreators] = useState<{ creator: string }[]>([]);

  useEffect(() => {
    const fetchUserAndCreators = async () => {
      try {
        // 🔑 check if user is authenticated
        const response = await axios.get("/api/user", {
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("uid", response.data.id);
          // fetch creators (static file or API)
          try {
            const creatorsRes = await axios.get("/data.json"); // ✅ relative path
            setCreators(creatorsRes.data);
          } catch (err) {
            console.error("Error fetching creators:", err);
          }

          setLogin("login");
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setLogin("error"); // not logged in
        } else {
          console.error("Unexpected error:", err);
          setLogin("error");
        }
      }
    };

    fetchUserAndCreators();
  }, []);

  if (login === "error") {
    return (
      <div className="text-center">
        Error logging you in, try again with telegram bot.
      </div>
    );
  }
  return login === "not-login" ? (
    <div className="text-center">Loading Contents...</div>
  ) : (
    <main>
      <h3 className="text-center">Creators 18+</h3>
      <p>
        By accessing the folders you have agree to our{" "}
        <Link href="/terms" className="text-blue-800">
          terms of use
        </Link>
      </p>
      <div className="grid grid-cols-2 md:flex items-center gap-4 p-4 flex-wrap mt-10">
        {creators ? (
          creators.map((item, index) => (
            <Link
              href={`/creator/${item.creator.replace(" ", "-")}`}
              key={index}
              className="flex flex-col items-center"
            >
              <div key={index}>
                <Image
                  src={`/Folder.png`}
                  alt={item.creator}
                  width={130}
                  height={130}
                />
                <h2 className="text-lg text-center">{item.creator}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">Loading creators...</p>
        )}
      </div>
    </main>
  );
}
