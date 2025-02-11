"use client";

import React from "react";
import type { Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  type LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "../lib/utils";
import useEditorStore from "../store/useEditorStore";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

type ToolBarButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label: string;
};

const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label,
}: ToolBarButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80 focus:outline-none",
              isActive && "bg-neutral-200/80",
            )}
          >
            <Icon className={"size-4"} />
          </button>
        </TooltipTrigger>
        <TooltipContent className={"border bg-background text-primary"}>
          <span className={"text-xs"}>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Impact", value: "Impact" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { label: "Palatino Linotype", value: "Palatino Linotype" },
    { label: "Garamond", value: "Garamond" },
    { label: "Bookman Old Style", value: "Bookman Old Style" },
    { label: "Century Gothic", value: "Century Gothic" },
    { label: "Candara", value: "Candara" },
    { label: "Franklin Gothic Medium", value: "Franklin Gothic Medium" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex h-7 w-[127px] shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
          }
        >
          <span className={"truncate"}>
            {editor?.getAttributes("textStyle").fontFamily ?? "Arial"}
          </span>
          <ChevronDownIcon className={"ml-2 size-4 shrink-0"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={"flex max-h-[400px] flex-col gap-y-1 overflow-y-auto p-1"}
      >
        {fonts.map((font, index) => (
          <button
            key={`${index}-${font.label}`}
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80":
                  editor?.getAttributes("textStyle").fontFamily === font.value,
              },
            )}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headingLevels = [
    { label: "Normal Text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
    { label: "Heading 6", value: 6, fontSize: "14px" },
  ];

  const getCurrentHeadingLevel = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive(`heading`, { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
          }
        >
          <span className={"truncate"}>{getCurrentHeadingLevel()}</span>
          <ChevronDownIcon className={"ml-2 size-4 shrink-0"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"flex flex-col gap-y-1 p-1"}>
        {headingLevels.map((level, index) => (
          <button
            key={`${index}-${level.label}`}
            onClick={() => {
              if (level.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: level.value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80":
                  (level.value === 0 && !editor?.isActive("heading")) ||
                  editor?.isActive("heading", { level: level.value }),
              },
            )}
            style={{ fontSize: level.fontSize }}
          >
            {level.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value: string = editor?.getAttributes("textStyle").color ?? "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
          }
        >
          <span className={"text-xs"}>A</span>
          <div className={"h-1 w-full"} style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"border-0 p-0"}>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value: string = editor?.getAttributes("highlight").color ?? "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
          }
        >
          <HighlighterIcon
            className={"size-4 font-extrabold"}
            style={{ color: value }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"border-0 p-0"}>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();

  const [value, setValue] = React.useState<string>(
    editor?.getAttributes("link").href ?? "",
  );

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href ?? "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
          }
        >
          <Link2Icon className={"size-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"flex items-center gap-x-2 p-2.5"}>
        <Input
          placeholder={"https://"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)} variant={"outline"}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={
              "flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
            }
          >
            <ImageIcon className={"size-4"} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className={"cursor-pointer"} onClick={onUpload}>
            <UploadIcon className={"nr-2 size-4"} />
            Upload from device
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"cursor-pointer"}
            onClick={() => setIsOpen(true)}
          >
            <SearchIcon className={"nr-2 size-4"} />
            Paste URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image Url</DialogTitle>
          </DialogHeader>
          <div className={""}>
            <Input
              placeholder={"https://"}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleImageUrlSubmit();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit} variant={"outline"}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
          }
        >
          <AlignLeftIcon className={"size-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"flex flex-col gap-y-1 p-1"}>
        {alignments.map((alignment, index) => (
          <button
            key={`${index}-${alignment.label}`}
            onClick={() =>
              editor?.chain().focus().setTextAlign(alignment.value).run()
            }
            className={cn(
              "flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": editor?.isActive({
                  textAlign: alignment.value,
                }),
              },
            )}
          >
            <alignment.icon className={"size-4"} />
            <span className={"text-xs"}>{alignment.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80 focus:outline-none"
          }
        >
          <ListIcon className={"size-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {lists.map((list, index) => (
          <button
            key={`${index}-${list.label}`}
            onClick={list.onClick}
            className={cn(
              "flex w-full items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": list.isActive,
              },
            )}
          >
            <list.icon className={"size-4"} />
            <span className={"text-xs"}>{list.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolBar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true",
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Strike",
        icon: StrikethroughIcon,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => {
          console.log("Comment");
        },
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        isActive: false,
      },
    ],
  ];
  return (
    <div
      className={
        "flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-sm bg-[#F1F4F9] px-2.5 py-0.5"
      }
    >
      {sections[0]?.map((section, index) => (
        <ToolBarButton key={`${index}-${section.label}`} {...section} />
      ))}
      <Separator orientation={"vertical"} className={"h-6 bg-neutral-300"} />
      <FontFamilyButton />
      <Separator orientation={"vertical"} className={"h-6 bg-neutral-300"} />
      <HeadingLevelButton />
      <Separator orientation={"vertical"} className={"h-6 bg-neutral-300"} />
      {/* font size*/}
      <Separator orientation={"vertical"} className={"h-6 bg-neutral-300"} />
      {sections[1]?.map((section, index) => (
        <ToolBarButton key={`${index}-${section.label}`} {...section} />
      ))}
      <Separator orientation={"vertical"} className={"h-6 bg-neutral-300"} />
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation={"vertical"} className={"h-6 bg-neutral-300"} />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      {/*  Line height */}
      <ListButton />
      <Separator orientation={"vertical"} className={"h-6 bg-neutral-300"} />
      {sections[2]?.map((section, index) => (
        <ToolBarButton key={`${index}-${section.label}`} {...section} />
      ))}
    </div>
  );
};
export default ToolBar;
