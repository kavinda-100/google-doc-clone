"use client";

import React from "react";
import Editor from "../../../../TipTapEditer/Editor";
import ToolBar from "../../../../TipTapEditer/ToolBar";
import NavBar from "./_navbar/NavBar";
import { useGetDocContent } from "../../../../hooks/docs/useGetDocContent";
import { toast } from "sonner";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";

const DocumentEditPage = ({ id }: { id: string }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const router = useRouter();

  //* get doc content hook
  const { data, isLoading, error } = useGetDocContent(id);
  if (error) {
    toast.error(error.message ?? "Error in fetching document");
  }

  //* handle unsaved changes
  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      setIsDialogOpen(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleLeave = () => {
    setIsDialogOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <div className={"h-full w-full"}>
        <div
          className={
            "fixed left-0 top-0 z-10 flex w-full flex-col gap-y-2 bg-background px-4 pt-2 print:hidden"
          }
        >
          <NavBar id={id} />
          <ToolBar />
        </div>
        <div className={"pt-[110px] print:pt-0"}>
          {isLoading ? (
            <Skeleton className={"h-full w-full print:hidden"} />
          ) : (
            <Editor content={data?.document?.content} />
          )}
        </div>
      </div>

      {/*   dialog for notify user about unSave changes   */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have unsaved changes! 🚨</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to leave? Please
              save your changes before leaving.
            </DialogDescription>
          </DialogHeader>
          <div className={"flex items-center gap-3"}>
            <Button onClick={() => handleLeave()} variant={"outline"}>
              Leave
            </Button>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant={"secondary"}
            >
              Stay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DocumentEditPage;
