import React from "react";
import Hero from "@/Components/Hero";
import Navbar from "@/Components/Navbar";

export default function Home() {
  return (
    <>
      <div className="flex flex-col font-light">
        <Navbar />
        <Hero />
      </div>
    </>
  );
}
