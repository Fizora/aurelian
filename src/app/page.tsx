import Navbar from "@/components/Navbar";
import Features from "@/components/section/Features";
import Hero from "@/components/section/Hero";

export default function Home() {
  return (
    <>
      <main className="bg-white text-black">
        {/* Navbar */}
        <Navbar />
        {/* Hero */}
        <Hero />
        {/* Features */}
        <Features />
      </main>
    </>
  );
}
