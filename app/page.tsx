"use client";

import JsonInput from "@/components/json-input";
import JsonViewer from "@/components/json-viewer";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string>("");

  const onSubmit = (json: string) => setResult(json);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-screen flex-col font-sans max-w-[1600px] mx-auto py-16 gap-8">
      <div>
        <h1 className="text-2xl font-bold">JSON Formatter</h1>
        <p className="text-sm text-muted-foreground">
          Fix your broken JSON with ease.
        </p>
        {isDev && (
          <div>
            example:
            <pre className="text-sm bg-muted p-4 rounded-md">
              {`{"user":{age:25152,"active" :false, greeting:true,"items":[{"value":2552}, 2525]},name:"example"}`}
            </pre>
          </div>
        )}
      </div>

      <div className="border border-border rounded-md grid grid-cols-[1fr_auto_1fr] min-h-[500px]">
        <div className="border-r border-border min-w-[50%]">
          <JsonInput onSubmit={onSubmit} />
        </div>
        <div className="border-r border-border"></div>
        <div className="min-w-[50%]">
          <JsonViewer json={result} />
        </div>
      </div>
    </div>
  );
}
