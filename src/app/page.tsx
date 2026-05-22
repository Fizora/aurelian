import Features from "@/components/section/Features";
import Hero from "@/components/section/Hero";
import Showcase from "@/components/section/Showcase";

export default function Home() {
  return (
    <>
      <main className="bg-white text-black">
        <Hero />
        <Showcase />
        <Features />
      </main>
    </>
  );
}
