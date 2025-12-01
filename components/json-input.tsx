"use client";

import PreferencesPopover from "@/components/preferences-popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Toolbar } from "@/components/ui/toolbar";
import { usePreferences } from "@/state/preferences";
import { jsonrepair } from "jsonrepair";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  json: string;
};

interface Props {
  onSubmit: (json: string) => void;
}

export default function JsonInput({ onSubmit }: Props) {
  const preferences = usePreferences();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<FormData>({
    defaultValues: {
      json: "",
    },
  });

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = form.handleSubmit((data: FormData) => {
    let result = data.json;
    if (preferences.repairJson) {
      result = jsonrepair(result);
    }
    try {
      result = JSON.parse(result);
      onSubmit(JSON.stringify(result, null, 2));
    } catch (error: unknown) {
      form.setError("json", {
        message: (error as Error).message ?? "Invalid JSON",
      });
    }
  });

  return (
    <div className="flex flex-col h-full">
      <Toolbar className="flex justify-between p-2">
        <span />
        <PreferencesPopover />
      </Toolbar>

      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 px-2 pb-2 gap-2"
        >
          <FormField
            control={form.control}
            name="json"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col">
                <FormControl className="flex-1">
                  <Textarea
                    {...field}
                    ref={textareaRef}
                    placeholder="Input your JSON here..."
                    className="resize-none h-full min-h-0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="max-w-2xs"
          >
            Format
          </Button>
        </form>
      </Form>
    </div>
  );
}
