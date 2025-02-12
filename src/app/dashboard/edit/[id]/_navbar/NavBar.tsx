"use client";

import React from "react";
import Image from "next/image";
import SignOutButton from "../../../../../components/auth/SignOutButton";
import DocumentInput from "./DocumentInput";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  Command,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf, BsFiletypeDoc } from "react-icons/bs";

const NavBar = () => {
  return (
    <nav className={"flex items-center justify-between pb-1"}>
      <div className={"flex items-center gap-2"}>
        <Image src={"/doc.svg"} alt={"logo"} width={30} height={30} />
        <div className={"flex flex-col"}>
          <DocumentInput />
          <div className={"flex"}>
            {/*  file */}
            <Menubar
              className={"h-auto border-0 bg-transparent p-0 shadow-none"}
            >
              <MenubarMenu>
                <MenubarTrigger
                  className={
                    "cursor-pointer text-sm font-normal hover:bg-muted"
                  }
                >
                  File
                </MenubarTrigger>
                <MenubarContent className={"print:hidden"}>
                  <MenubarSub>
                    <MenubarSubTrigger className={"flex items-center gap-2"}>
                      <FileIcon className={"size-3"} />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <BsFiletypeDoc className={"size-3"} />
                        DOCX
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <BsFilePdf className={"size-3"} />
                        PDF
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <FileJsonIcon className={"size-3"} />
                        JSON
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <GlobeIcon className={"size-3"} />
                        HTML
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <FileTextIcon className={"size-3"} />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem className={"flex items-center gap-2"}>
                    <FilePlusIcon className={"size-3"} />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className={"flex items-center gap-2"}>
                    <FilePenIcon className={"size-3"} />
                    Rename Document
                  </MenubarItem>
                  <MenubarItem className={"flex items-center gap-2"}>
                    <TrashIcon className={"size-3"} />
                    Delete Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    className={"flex items-center gap-2"}
                    onClick={() => window.print()}
                  >
                    <PrinterIcon className={"size-3"} />
                    Print Document
                    <MenubarShortcut className={"flex items-center text-xs"}>
                      <Command className={"size-3"} />P
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/*  edit */}
              <MenubarMenu>
                <MenubarTrigger
                  className={
                    "cursor-pointer text-sm font-normal hover:bg-muted"
                  }
                >
                  Edit
                </MenubarTrigger>
                <MenubarContent className={"print:hidden"}>
                  <MenubarItem className={"flex items-center gap-2"}>
                    <Undo2Icon className={"size-3"} />
                    Undo
                    <MenubarShortcut className={"flex items-center text-xs"}>
                      <Command className={"size-3"} />Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem className={"flex items-center gap-2"}>
                    <Redo2Icon className={"size-3"} />
                    Redo
                    <MenubarShortcut className={"flex items-center text-xs"}>
                      <Command className={"size-3"} />Y
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/*  insert */}
              <MenubarMenu>
                <MenubarTrigger
                  className={
                    "cursor-pointer text-sm font-normal hover:bg-muted"
                  }
                >
                  Insert
                </MenubarTrigger>
                <MenubarContent className={"print:hidden"}>
                  <MenubarSub>
                    <MenubarSubTrigger className={"flex items-center gap-2"}>
                      <TableIcon className={"size-3"} />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem className={"flex items-center gap-2"}>
                        1 x 1
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        2 x 2
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        3 x 3
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              {/*  format */}
              <MenubarMenu>
                <MenubarTrigger
                  className={
                    "cursor-pointer text-sm font-normal hover:bg-muted"
                  }
                >
                  Format
                </MenubarTrigger>
                <MenubarContent className={"print:hidden"}>
                  <MenubarSub>
                    <MenubarSubTrigger className={"flex items-center gap-2"}>
                      <TextIcon className={"size-3"} />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <BoldIcon className={"size-3 font-bold"} />
                        Bold
                        <MenubarShortcut
                          className={"flex items-center text-xs"}
                        >
                          <Command className={"size-3"} />B
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <ItalicIcon className={"size-3"} />
                        Italic
                        <MenubarShortcut
                          className={"flex items-center text-xs"}
                        >
                          <Command className={"size-3"} />I
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <UnderlineIcon className={"size-3"} />
                        Underline
                        <MenubarShortcut
                          className={"flex items-center text-xs"}
                        >
                          <Command className={"size-3"} />U
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className={"flex items-center gap-2"}>
                        <StrikethroughIcon className={"size-3"} />
                        Strikethrough
                        <MenubarShortcut
                          className={"flex items-center text-xs"}
                        >
                          <Command className={"size-3"} />S
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem className={"flex items-center gap-2"}>
                    <RemoveFormattingIcon className={"size-3"} />
                    Remove Formatting
                    <MenubarShortcut className={"flex items-center text-xs"}>
                      <Command className={"size-3"} />\
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      <div>
        <SignOutButton />
      </div>
    </nav>
  );
};
export default NavBar;
