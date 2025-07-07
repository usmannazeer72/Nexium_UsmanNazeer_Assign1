"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-200 overflow-hidden">
      <div className="backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-12 flex flex-col items-center z-10">
        <Image
          src="/quote-logo.png"
          alt="Quotify Logo"
          width={96}
          height={96}
          className="mb-6"
        />
        <h1 className="text-4xl font-extrabold text-cyan-700 mb-8 drop-shadow">
          Welcome to the Quotify
        </h1>
        <Link href="/quote">
          <button className="btn btn-primary bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-bold rounded-full px-10 py-3 shadow-lg transition">
            Quotify
          </button>
        </Link>
      </div>
    </div>
  );
}
