"use client";

import React from "react";
import { FilePenIcon, Loader2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameDocs } from "../../../hooks/docs/useRenameDocs";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useGetDocContent } from "../../../hooks/docs/useGetDocContent";
import { toast } from "sonner";

type RenameDocProps = {
  docId: string;
};

const RenameDoc = ({ docId }: RenameDocProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [docName, setDocName] = React.useState<string>("");

  //* Fetch document content
  const { data, isLoading, error } = useGetDocContent(docId);

  React.useEffect(() => {
    if (data && !isLoading) {
      setDocName(data.document.name);
    }
  }, [data, isLoading]);

  if (error) {
    toast.error(error.message ?? "Error fetching document");
  }

  //* Mutation for renaming the document
  const { mutate, isPending: isDocRenamePending } = useRenameDocs({
    id: docId,
  });

  // Function to rename document
  const renameDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (docName.trim() === "") {
      toast.error("Document name cannot be empty");
      return;
    }

    mutate(
      { id: docId, docName },
      {
        onSuccess: () => {
          setIsOpen(false); // Close only after successful rename
        },
      },
    );
  };

  return (
    <>
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <FilePenIcon className="size-3" />
        Rename
      </div>

      {/* Rename Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          onClick={(e) => e.stopPropagation()} // Prevent clicks from closing dialog
        >
          <DialogHeader>
            <DialogTitle>Rename the document</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3">
            <Input
              value={docName}
              type="text"
              onChange={(e) => setDocName(e.target.value)} // No stopPropagation here
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={renameDocument}
              variant="outline"
              disabled={isDocRenamePending}
            >
              {isDocRenamePending ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                "Rename"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RenameDoc;
