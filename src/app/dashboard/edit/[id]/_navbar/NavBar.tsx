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
  Command,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  PrinterIcon,
  TrashIcon,
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
                    <FileIcon className={"size-3"} />
                    Save
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
                  <MenubarItem className={"flex items-center gap-2"}>
                    <FileIcon className={"size-3"} />
                    Save
                  </MenubarItem>
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
                  <MenubarItem className={"flex items-center gap-2"}>
                    <FileIcon className={"size-3"} />
                    Save
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
