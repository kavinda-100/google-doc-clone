"use client";

import React from "react";
import { Loader2Icon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useDeleteDocs } from "../../../hooks/docs/useDeleteDocs";

type DeleteDocProps = {
  docId: string;
};

const DeleteDoc = ({ docId }: DeleteDocProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // mutation
  const { mutate: deleteDocMutate, isPending: isDeleteDocPending } =
    useDeleteDocs({ id: docId, isNavigate: false });
  // function
  const handleDeleteDocument = () => {
    setIsOpen(false);
    deleteDocMutate();
  };

  return (
    <>
      <div
        className={"flex items-center gap-3"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <TrashIcon className={"size-3 text-red-500"} />
        Delete
      </div>

      {/* dialog for confirmation of delete */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete the document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the document?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} variant={"secondary"}>
              Cancel
            </Button>
            <Button onClick={handleDeleteDocument} variant={"destructive"}>
              {isDeleteDocPending ? (
                <Loader2Icon className={"size-4 animate-spin text-red-500"} />
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DeleteDoc;
