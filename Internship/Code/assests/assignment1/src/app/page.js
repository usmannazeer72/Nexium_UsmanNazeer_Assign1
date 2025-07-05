"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fcfcff",
        padding: "2rem",
      }}
    >
      <Link
        href="/quote"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Button
          style={{
            background: "linear-gradient(90deg, #06b6d4 0%, #0ea5e9 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.25rem",
            border: "none",
            borderRadius: "2rem",
            padding: "0.75rem 2.5rem",
            boxShadow: "0 4px 16px 0 rgba(6,182,212,0.12)",
            cursor: "pointer",
            transition: "background 0.2s, box-shadow 0.2s",
          }}
        >
          Quote Generator
        </Button>
      </Link>
    </div>
  );
}
