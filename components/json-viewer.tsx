"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar } from "@/components/ui/toolbar";
import { CodeIcon, CopyIcon, ListTreeIcon } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
interface Props {
  json: string;
}

export default function JsonViewer({ json }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  function copyToClipboard() {
    navigator.clipboard.writeText(json);
    toast.success("JSON copied to clipboard.");
  }

  return (
    <div className="flex flex-col h-full">
      <Toolbar className="p-2 flex justify-between">
        <ToggleGroup type="single" variant="outline" defaultValue="code">
          <ToggleGroupItem value="code">
            <CodeIcon className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="tree">
            <ListTreeIcon className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <span>
          <Button variant="outline" onClick={copyToClipboard}>
            <CopyIcon className="w-4 h-4" />
          </Button>
        </span>
      </Toolbar>

      <div className="px-2 pb-2 h-full">
        <div
          ref={editorRef}
          className="text-sm bg-input/30 rounded-md h-full overflow-hidden border"
        >
          <pre className="p-2">
            <code className="text-sm">{json}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
