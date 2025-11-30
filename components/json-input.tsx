"use client";

import PreferencesPopover from "@/components/preferences-popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type FormData = {
  json: string;
};

interface Props {
  onSubmit: (json: string) => void;
}

export default function JsonInput({ onSubmit }: Props) {
  const form = useForm<FormData>({
    defaultValues: {
      json: "",
    },
  });

  const handleSubmit = form.handleSubmit((data: FormData) =>
    onSubmit(data.json)
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          example:
          <pre className="text-sm bg-muted p-4 rounded-md">
            {`{"user":{age:25152,"active" :false, greeting:true,"items":[{"value":2552}, 2525]},name:"example"}`}
          </pre>
        </div>
        <span>
          <PreferencesPopover />
        </span>
        <FormField
          control={form.control}
          name="json"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JSON</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={10}
                  placeholder="Input your JSON here..."
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" size="lg" className="max-w-2xs">
          Format
        </Button>
      </form>
    </Form>
  );
}
