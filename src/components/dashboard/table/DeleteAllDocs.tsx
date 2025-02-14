import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Loader2, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteAllDocs } from "../../../hooks/docs/useDeleteAllDocs";

type DeleteAllDocsProps = {
  docIds: string[];
};

const DeleteAllDocs = ({ docIds }: DeleteAllDocsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteAllDocs();

  const handleDelete = () => {
    mutate({ docIds });
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
        <TrashIcon className="size-5 text-red-500" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Documents</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {docIds.length} document(s)?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2
                  className={"size-3 animate-spin text-muted-foreground"}
                />
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

export default DeleteAllDocs;
