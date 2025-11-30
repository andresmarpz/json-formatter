import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar } from "@/components/ui/toolbar";
import { CodeIcon, CopyIcon, ListTreeIcon } from "lucide-react";
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

  return (
    <div className="border border-border rounded-md">
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
      <pre className="text-sm bg-muted p-4 rounded-md">{json}</pre>
    </div>
  );
}
