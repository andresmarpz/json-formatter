import { jsonrepair } from "jsonrepair";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar } from "@/components/ui/toolbar";
import { CodeIcon, CopyIcon, ListTreeIcon } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

interface Props {
  // Raw JSON string.
  json: string;
}

export default function JsonViewer({ json }: Props) {
  function copyToClipboard() {
    navigator.clipboard.writeText(json);
    toast.success("JSON copied to clipboard.");
  }

  const renderJson = useMemo(() => {
    if (!json) return "";
    const repaired = jsonrepair(json);
    return JSON.stringify(JSON.parse(repaired), null, 2);
  }, [json]);

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
        <pre className="text-sm bg-muted p-4 rounded-md h-full overflow-auto">
          {renderJson}
        </pre>
      </div>
    </div>
  );
}
