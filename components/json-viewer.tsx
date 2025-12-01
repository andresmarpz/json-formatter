"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar } from "@/components/ui/toolbar";
import { CodeIcon, CopyIcon, ListTreeIcon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import {
  EditorView,
  lineNumbers,
  highlightActiveLine,
  Decoration,
  ViewPlugin,
  DecorationSet,
  ViewUpdate,
} from "@codemirror/view";
import { EditorState, StateEffect } from "@codemirror/state";
import { json as jsonLang } from "@codemirror/lang-json";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Line hover highlight extension
const setHoveredLine = StateEffect.define<number | null>();
const hoverLineDecoration = Decoration.line({ class: "cm-hover-line" });

const hoverHighlightPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet = Decoration.none;
    hoveredPos: number | null = null;

    constructor(view: EditorView) {
      this.decorations = Decoration.none;
    }

    update(update: ViewUpdate) {
      for (const effect of update.transactions.flatMap((t) => t.effects)) {
        if (effect.is(setHoveredLine)) {
          const lineNum = effect.value;
          if (lineNum === null) {
            this.decorations = Decoration.none;
          } else {
            const line = update.state.doc.line(lineNum);
            this.decorations = Decoration.set([
              hoverLineDecoration.range(line.from),
            ]);
          }
        }
      }
    }
  },
  {
    decorations: (v) => v.decorations,
    eventHandlers: {
      mousemove(event, view) {
        const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
        if (pos !== null) {
          const line = view.state.doc.lineAt(pos).number;
          if (line !== this.hoveredPos) {
            this.hoveredPos = line;
            view.dispatch({ effects: setHoveredLine.of(line) });
          }
        }
      },
      mouseleave(_event, view) {
        if (this.hoveredPos !== null) {
          this.hoveredPos = null;
          view.dispatch({ effects: setHoveredLine.of(null) });
        }
      },
    },
  }
);

const jsonViewerTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
    height: "100%",
  },
  ".cm-scroller": {
    fontFamily: "var(--font-geist-mono), monospace",
    overflow: "auto",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 8px 0 16px",
    minWidth: "40px",
    color: "#d4d4d4", // text-neutral-300
    backgroundColor: "oklch(1 0 0 / 15%)",
  },
  ".cm-content": {
    padding: "8px 0",
  },
  ".cm-line": {
    padding: "0 8px",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  ".cm-hover-line": {
    backgroundColor: "rgba(59, 130, 246, 0.5)", // blue-500/50
  },
});

const jsonHighlightStyle = HighlightStyle.define([
  { tag: tags.string, color: "#ce9178" }, // orange for strings
  { tag: tags.number, color: "#b5cea8" }, // light green for numbers
  { tag: tags.bool, color: "#569cd6" }, // blue for booleans
  { tag: tags.null, color: "#569cd6" }, // blue for null
  { tag: tags.propertyName, color: "#9cdcfe" }, // cyan for keys
  { tag: tags.punctuation, color: "#808080" }, // gray for punctuation
]);

interface Props {
  json: string;
}

export default function JsonViewer({ json }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: json,
      extensions: [
        EditorView.editable.of(false),
        EditorState.readOnly.of(true),
        lineNumbers(),
        highlightActiveLine(),
        hoverHighlightPlugin,
        jsonLang(),
        syntaxHighlighting(jsonHighlightStyle),
        jsonViewerTheme,
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update content when json changes
  useEffect(() => {
    if (viewRef.current) {
      const currentDoc = viewRef.current.state.doc.toString();
      if (currentDoc !== json) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: currentDoc.length,
            insert: json,
          },
        });
      }
    }
  }, [json]);

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
        />
      </div>
    </div>
  );
}
