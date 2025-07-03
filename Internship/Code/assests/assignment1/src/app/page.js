"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Link
        href="/quote"
        style={{
          padding: "1rem 2rem",
          borderRadius: "8px",
          background: "#0070f3",
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.25rem",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "background 0.2s",
        }}
      >
        Quote Generator
      </Link>
    </div>
  );
}
