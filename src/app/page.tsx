"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [creators, setCreators] = useState<{ creator: string }[]>([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`/data.json`);
        setCreators(response.data);
        //setCreators(response.data.creators);
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    };
    fetchCreators();
  }, []);
  return (
    <main className="grid grid-cols-2 md:flex items-center gap-4 p-4 flex-wrap mt-10">
      {creators ? (
        creators.map((item, index) => (
          <Link
            href={`/creator/${item.creator}`}
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
    </main>
  );
}
