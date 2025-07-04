"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <CardContent>
          <Link
            href="/quote"
            style={{ width: "100%", display: "inline-block" }}
          >
            <Button
              style={{ width: "100%", fontSize: "1.25rem", fontWeight: "bold" }}
            >
              Quote Generator
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
