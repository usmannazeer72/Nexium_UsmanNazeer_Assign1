"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";

function getRandomQuotes(arr, n) {
  if (!arr) return [];
  const result = [];
  const used = new Set();
  const max = Math.min(n, arr.length);
  while (result.length < max) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

export default function QuoteGenerator() {
  const [quotesData, setQuotesData] = useState({});
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");
  const [topics, setTopics] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Load quotes.json dynamically on mount
  useEffect(() => {
    import("../quotes.json")
      .then((mod) => {
        const data = mod.default || mod;
        setQuotesData(data);
        setTopics(Object.keys(data));
        if (Object.keys(data).length > 0) {
          setTopic(Object.keys(data)[0]);
          setInputValue(Object.keys(data)[0]);
        }
      })
      .catch(() => setError("Failed to load quotes."));
  }, []);

  // When topic changes, pick three random quotes from that topic
  useEffect(() => {
    if (topic && quotesData && Object.keys(quotesData).length > 0) {
      const topicQuotes = quotesData[topic];
      if (topicQuotes && topicQuotes.length > 0) {
        setError("");
        setQuotes(getRandomQuotes(topicQuotes, 3));
      } else {
        setQuotes([]);
        setError("No quotes found for this topic.");
      }
    }
  }, [topic, quotesData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTopic(inputValue);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-200 overflow-hidden">
      <div className="backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-12 flex flex-col items-center z-10 w-full max-w-2xl">
        <div className="w-full flex justify-start mb-4">
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#06b6d4",
            marginBottom: "2rem",
            fontFamily: "Inter, Geist, Segoe UI, Arial, sans-serif",
            textAlign: "center",
          }}
        >
          Quote Generator
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "2.5rem",
            width: "100%",
          }}
        >
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter topic..."
            style={{
              fontSize: "1.1rem",
              padding: "0.5rem 1.2rem",
              borderRadius: "1.2rem",
              border: "1.5px solid #06b6d4",
              outline: "none",
              background: "#e0f7fa",
              color: "#111",
              fontWeight: 500,
              boxShadow: "0 2px 8px 0 rgba(6,182,212,0.08)",
              width: 200,
              height: 40,
              textAlign: "center",
            }}
          />
          <Button
            type="submit"
            style={{
              background: "linear-gradient(90deg, #06b6d4 0%, #0ea5e9 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "1.2rem",
              padding: "0.5rem 1.2rem",
              boxShadow: "0 4px 16px 0 rgba(6,182,212,0.12)",
              cursor: "pointer",
              transition: "background 0.2s, box-shadow 0.2s",
              width: 200,
              height: 40,
            }}
          >
            Generate Quote
          </Button>
        </form>
        {error && (
          <div style={{ color: "#e11d48", marginBottom: "1rem" }}>{error}</div>
        )}
        {quotes.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              marginTop: "1.2rem",
              width: "100%",
              alignItems: "center",
            }}
          >
            {quotes.map((q, i) => (
              <Card
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "1.2rem",
                  boxShadow: "0 4px 16px 0 rgba(0,0,0,0.07)",
                  padding: 0,
                  minWidth: 200,
                  maxWidth: 420,
                  textAlign: "center",
                }}
              >
                <CardContent style={{ padding: "1.2rem 1.2rem 1rem 1.2rem" }}>
                  <p
                    style={{
                      fontStyle: "italic",
                      fontSize: "1.1rem",
                      color: "#222",
                      marginBottom: "0.8rem",
                    }}
                  >
                    "{q.quote}"
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      color: "#222",
                      fontSize: "0.95rem",
                    }}
                  >
                    - {q.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
