"use client";

import { useEditor, EditorContent } from "@tiptap/react";
// extensions
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import { ImageResize } from "tiptap-extension-resize-image";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Code from "@tiptap/extension-code";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// lowlight languages
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import csharp from "highlight.js/lib/languages/csharp";
import c from "highlight.js/lib/languages/c";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import { all, createLowlight } from "lowlight";
// custom extensions
import { FontSizeExtension } from "./extensions/FontSizeExtension";
import { LineHeightExtension } from "./extensions/LineHeightExtension";
import { PageBreakExtension } from "./extensions/PageBreakExtension";

import useEditorStore from "../store/useEditorStore";
import Ruler from "./Ruler";
import { useRulerStore } from "../store/useRulerStore";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above,
// but you can also register only specific languages to reduce bundle-size
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("csharp", csharp);
lowlight.register("c", c);
lowlight.register("python", python);
lowlight.register("java", java);

const Editor = () => {
  const { setEditor } = useEditorStore();
  const { leftMargin, rightMargin } = useRulerStore();
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        class:
          "focus:outline-none print:border-0 border bg-white flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
      FontFamily,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["paragraph", "heading"],
        defaultLineHeight: "normal",
      }),
      PageBreakExtension,
      Code,
      Subscript,
      Superscript,
      HorizontalRule,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: `
        <p>Here is a TypeScript code:</p>
        <pre>
          <code class="language-typescript">
            const add = (a: number, b: number): number => a + b;
          </code>
        </pre>
        <p>Here is a C# code:</p>
        <pre>
          <code class="language-csharp">
            public class HelloWorld
            {
                public static void Main()
                {
                    System.Console.WriteLine("Hello, World!");
                }
            }
          </code>
        </pre>
        <p>Here is a python code:</p>
        <pre>
          <code class="language-python">
            def fizz_buzz():
                for i in range(1, 21):
                    if i % 15 == 0:
                        print("FizzBuzz")
                    elif i % 3 == 0:
                        print("Fizz")
                    elif i % 5 == 0:
                        print("Buzz")
                    else:
                        print(i)
          </code>
        </pre>
    `,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
  });

  return (
    <div
      className={
        "size-full overflow-x-auto bg-[#F9FBFD] p-4 print:overflow-visible print:bg-white print:p-0"
      }
    >
      <Ruler />
      <div
        className={
          "mx-auto flex w-[816px] max-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0"
        }
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
export default Editor;
