"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [inputValue, setInputValue] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");

  // Load quotes.json dynamically on mount
  useEffect(() => {
    import("../quotes.json")
      .then((mod) => setQuotesData(mod.default || mod))
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

  const getRandomQuote = () => {
    if (
      topic &&
      quotesData &&
      quotesData[topic] &&
      quotesData[topic].length > 0
    ) {
      setQuotes(getRandomQuotes(quotesData[topic], 3));
      setError("");
    } else {
      setQuotes([]);
      setError("No quotes found for this topic.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTopic(inputValue);
  };

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
      <Card style={{ maxWidth: 500, width: "100%" }}>
        <CardHeader>
          <CardTitle>Quote Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Label htmlFor="topic-input">Topic</Label>
            <Input
              id="topic-input"
              type="text"
              placeholder="Enter topic..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit">Set Topic</Button>
          </form>
          {topic && (
            <div style={{ marginBottom: "1rem", color: "#0070f3" }}>
              <strong>Topic:</strong> {topic}
            </div>
          )}
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}
          {quotes.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              {quotes.map((q, i) => (
                <div key={i} style={{ marginBottom: "1.5rem" }}>
                  <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>
                    &quot;{q.quote}&quot;
                  </p>
                  <p style={{ fontWeight: "bold" }}>- {q.author}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
