"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const creators = [
  {
    creator: "Ms Sethi",
  },
  {
    creator: "Gracie Bon",
  },
  {
    creator: "Blah GiGi",
  },
];

export default function Page() {
  return (
    <main className="flex items-center gap-4 p-4 flex-wrap mt-10">
      {creators.map((item, index) => (
        <div key={index}>
          <Image
            src={`/Folder.png`}
            alt={item.creator}
            width={130}
            height={130}
          />
          <h2 className="text-lg text-center">{item.creator}</h2>
        </div>
      ))}
    </main>
  );
}
