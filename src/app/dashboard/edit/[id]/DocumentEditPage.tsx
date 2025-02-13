"use client";

import React from "react";
import Editor from "../../../../TipTapEditer/Editor";
import ToolBar from "../../../../TipTapEditer/ToolBar";
import NavBar from "./_navbar/NavBar";
import { useGetDocContent } from "../../../../hooks/docs/useGetDocContent";
import { toast } from "sonner";
import { Skeleton } from "../../../../components/ui/skeleton";

const DocumentEditPage = ({ id }: { id: string }) => {
  //* get doc content hook
  const { data, isLoading, error } = useGetDocContent(id);
  if (error) {
    toast.error(error.message ?? "Error in fetching document");
  }
  return (
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
  );
};
export default DocumentEditPage;
