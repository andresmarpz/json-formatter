"use client";

import JsonInput from "@/components/json-input";
import JsonViewer from "@/components/json-viewer";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");

  const onSubmit = (json: string) => {
    setResult(json);
  };

  return (
    <div className="flex min-h-screen flex-col font-sans max-w-4xl mx-auto py-16 gap-8">
      <div>
        <h1 className="text-2xl font-bold">JSON Formatter</h1>
        <p className="text-sm text-muted-foreground">
          Fix your broken JSON with ease.
        </p>
      </div>

      <JsonInput onSubmit={onSubmit} />

      <hr />

      {result && <JsonViewer json={result} />}
    </div>
  );
}
