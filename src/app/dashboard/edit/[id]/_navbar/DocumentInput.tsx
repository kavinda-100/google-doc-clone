"use client";

import React from "react";
import { BsCloudCheck } from "react-icons/bs";
import { cn } from "../../../../../lib/utils";
import { Input } from "../../../../../components/ui/input";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRenameDocs } from "../../../../../hooks/docs/useRenameDocs";
import { useGetDocContent } from "../../../../../hooks/docs/useGetDocContent";

const DocumentInput = ({ id }: { id: string }) => {
  const [docName, setDocName] = React.useState<string>("");
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  //* get doc content hook
  const { data, isLoading, error } = useGetDocContent(id);
  if (error) {
    toast.error(error.message ?? "Error in fetching document");
  }
  React.useEffect(() => {
    if (data) {
      setDocName(data.document.name);
    }
  }, [data]);

  //* rename doc hook
  const { mutate, isPending } = useRenameDocs({ id });
  const saveContent = async () => {
    setIsEditing(false);
    if (docName.trim() === "") {
      return;
    }
    mutate({ id, docName });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={"flex items-center gap-2"}>
      <span
        className={cn(
          "text-md h-[30px] min-w-[200px] cursor-pointer truncate px-1.5",
          {
            hidden: isEditing,
          },
        )}
        onClick={handleEdit}
      >
        {isLoading ? "Untitled Document" : data?.document.name}
      </span>
      <Input
        value={docName}
        disabled={isPending || !isEditing || isLoading}
        onChange={(e) => setDocName(e.target.value)}
        className={cn(
          "text-md h-[30px] w-[200px] outline-none focus:outline-none",
          {
            hidden: !isEditing,
          },
        )}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await saveContent();
          }
        }}
      />
      {isPending ? (
        <Loader2Icon className={"size-4 animate-spin text-blue-500"} />
      ) : (
        <BsCloudCheck className={"size-4 text-blue-500"} />
      )}
    </div>
  );
};
export default DocumentInput;
