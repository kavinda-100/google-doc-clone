"use client";

import React from "react";
import Image from "next/image";
// import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Loader2Icon,
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
import useEditorStore from "../../../../../store/useEditorStore";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import DashboardLoader from "../../../../../components/DashboardLoader";
import Link from "next/link";
import { useCreateDocs } from "../../../../../hooks/docs/useCreateDocs";
import { useRenameDocs } from "../../../../../hooks/docs/useRenameDocs";
import { useDeleteDocs } from "../../../../../hooks/docs/useDeleteDocs";

const NavBar = ({ id }: { id: string }) => {
  const { editor } = useEditorStore();
  // for custom table
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [rows, setRows] = React.useState(0);
  const [cols, setCols] = React.useState(0);

  //* delete document mutation
  // state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  // mutation
  const { mutate: deleteDocMutate, isPending: isDeleteDocPending } =
    useDeleteDocs({ id });

  //* rename document mutation
  // state
  const [docName, setDocName] = React.useState<string>("");
  const [isDialogForRenameOpen, setIsDialogForRenameOpen] =
    React.useState(false);
  // mutation
  const { mutate, isPending: isDocRenamePending } = useRenameDocs({ id });
  // function
  const renameDocument = () => {
    setIsDialogForRenameOpen(false);
    if (docName.trim() === "") {
      return;
    }
    mutate({ id, docName });
  };

  //* create new document mutation
  const { mutate: CreateDocMutate, isPending: isCreateDocPending } =
    useCreateDocs();

  const insertTable = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const insertCustomTable = () => {
    if (rows === 0 || cols === 0) {
      return;
    }
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const OnSaveJson = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, "document.json"); //! use the document title
  };

  const OnSaveHtml = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload(blob, "document.html"); //! use the document title
  };

  const OnSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, "document.txt"); //! use the document title
  };

  // const OnSavePDF = () => {
  //   if (!editor) return;
  //
  //   const content = editor.getText();
  //   const doc = new jsPDF();
  //   doc.text(content, 10, 10);
  //   doc.save("document.pdf"); //! use the document title
  // };

  const OnSaveDOCX = async () => {
    if (!editor) return;

    const content = editor.getText();
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph({ children: [new TextRun(content)] })],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    onDownload(blob, "document.docx"); //! use the document title
  };

  return (
    <>
      {isCreateDocPending && <DashboardLoader className={"min-h-screen"} />}
      <nav className={"flex items-center justify-between pb-1"}>
        <div className={"flex items-center gap-2"}>
          <Link href={"/dashboard"}>
            <Image src={"/doc.svg"} alt={"logo"} width={30} height={30} />
          </Link>
          <div className={"flex flex-col"}>
            <DocumentInput id={id} />
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
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={OnSaveDOCX}
                        >
                          <BsFiletypeDoc className={"size-3"} />
                          DOCX
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() => window.print()}
                        >
                          <BsFilePdf className={"size-3"} />
                          PDF
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={OnSaveJson}
                        >
                          <FileJsonIcon className={"size-3"} />
                          JSON
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={OnSaveHtml}
                        >
                          <GlobeIcon className={"size-3"} />
                          HTML
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={OnSaveText}
                        >
                          <FileTextIcon className={"size-3"} />
                          Text
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem
                      className={"flex items-center gap-2"}
                      onClick={() => CreateDocMutate({ id: null })}
                    >
                      <FilePlusIcon className={"size-3"} />
                      New Document
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      className={"flex items-center gap-2"}
                      onClick={() => setIsDialogForRenameOpen(true)}
                    >
                      <FilePenIcon className={"size-3"} />
                      Rename Document
                    </MenubarItem>
                    <MenubarItem
                      className={"flex items-center gap-2"}
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
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
                    <MenubarItem
                      className={"flex items-center gap-2"}
                      onClick={() => editor?.chain().focus().undo().run()}
                    >
                      <Undo2Icon className={"size-3"} />
                      Undo
                      <MenubarShortcut className={"flex items-center text-xs"}>
                        <Command className={"size-3"} />Z
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      className={"flex items-center gap-2"}
                      onClick={() => editor?.chain().focus().redo().run()}
                    >
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
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() => insertTable(1, 1)}
                        >
                          1 x 1
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() => insertTable(2, 2)}
                        >
                          2 x 2
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() => insertTable(3, 3)}
                        >
                          3 x 3
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() => insertTable(4, 4)}
                        >
                          4 x 4
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() => setIsDialogOpen(true)}
                        >
                          Custom Table
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
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                        >
                          <BoldIcon className={"size-3 font-bold"} />
                          Bold
                          <MenubarShortcut
                            className={"flex items-center text-xs"}
                          >
                            <Command className={"size-3"} />B
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                        >
                          <ItalicIcon className={"size-3"} />
                          Italic
                          <MenubarShortcut
                            className={"flex items-center text-xs"}
                          >
                            <Command className={"size-3"} />I
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                        >
                          <UnderlineIcon className={"size-3"} />
                          Underline
                          <MenubarShortcut
                            className={"flex items-center text-xs"}
                          >
                            <Command className={"size-3"} />U
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          className={"flex items-center gap-2"}
                          onClick={() =>
                            editor?.chain().focus().toggleStrike().run()
                          }
                        >
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
                    <MenubarItem
                      className={"flex items-center gap-2"}
                      onClick={() =>
                        editor?.chain().focus().unsetAllMarks().run()
                      }
                    >
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

          {/* custom insert table - dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={"text-muted-foreground"}>
                  Insert the number of rows and columns for the table
                </DialogTitle>
              </DialogHeader>
              <div className={"flex items-center gap-3"}>
                <div className={"flex items-center gap-3"}>
                  <p className={"font-semibold"}>Rows:</p>
                  <Input
                    type={"number"}
                    onChange={(e) => setRows(parseInt(e.target.value))}
                  />
                </div>
                <div className={"flex items-center gap-3"}>
                  <p className={"font-semibold"}>Columns:</p>
                  <Input
                    type={"number"}
                    onChange={(e) => setCols(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    insertCustomTable();
                    setIsDialogOpen(false);
                  }}
                  variant={"outline"}
                >
                  Insert Table
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Rename document - dialog */}
          <Dialog
            open={isDialogForRenameOpen}
            onOpenChange={setIsDialogForRenameOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename the document</DialogTitle>
              </DialogHeader>
              <div className={"flex items-center gap-3"}>
                <Input
                  type={"text"}
                  onChange={(e) => setDocName(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setIsDialogForRenameOpen(false)}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    renameDocument();
                    setIsDialogForRenameOpen(false);
                  }}
                  variant={"outline"}
                >
                  {isDocRenamePending ? (
                    <Loader2Icon className={"size-4 animate-spin"} />
                  ) : (
                    "Rename"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* delete document - dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete the document</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the document?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => setIsDeleteDialogOpen(false)}
                  variant={"secondary"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deleteDocMutate();
                    setIsDeleteDialogOpen(false);
                  }}
                  variant={"destructive"}
                >
                  {isDeleteDocPending ? (
                    <Loader2Icon
                      className={"size-4 animate-spin text-red-500"}
                    />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <SignOutButton />
        </div>
      </nav>
    </>
  );
};
export default NavBar;
