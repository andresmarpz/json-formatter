import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePreferences } from "@/state/preferences";
import { Settings2Icon } from "lucide-react";

export default function PreferencesPopover() {
  const { repairJson, setRepairJson } = usePreferences();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings2Icon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-3">
        <div>
          <span className="text-sm font-medium text-muted-foreground">
            Preferences
          </span>

          <div className="mt-2">
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
              <Checkbox
                id="toggle-2"
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                checked={repairJson}
                onCheckedChange={setRepairJson}
              />
              <p className="text-sm leading-none font-medium my-[1.5px]">
                Repair JSON
              </p>
            </Label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
