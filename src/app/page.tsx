"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-600 to-indigo-700">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white"
      >
        <Image
          src="/logo-white.png"
          alt="PropPix"
          width={240}
          height={60}
          className="mx-auto mb-6"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          PropPix – The Future of Real Estate
        </h1>
        <p className="text-lg md:text-2xl mb-8 opacity-90">
          AI + Blockchain super-app for the $300T market
        </p>
        <button className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
          Explore Properties
        </button>
      </motion.div>
    </main>
  );
}
