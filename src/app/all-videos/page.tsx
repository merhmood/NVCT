import React from "react";

import AllArticles from "@/components/AllArticles";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function page() {
  return (
    <main className="flex flex-col justify-between h-screen">
      <div>
        <Navigation />
        <AllArticles />
      </div>
      <Footer />
    </main>
  );
}
