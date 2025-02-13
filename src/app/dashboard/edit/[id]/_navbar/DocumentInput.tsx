"use client";

import React from "react";
import { BsCloudCheck } from "react-icons/bs";
import { cn } from "../../../../../lib/utils";
import { Input } from "../../../../../components/ui/input";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useRenameDocs } from "../../../../../hooks/docs/useRenameDocs";
import { useGetDocContent } from "../../../../../hooks/docs/useGetDocContent";
import { useSaveDocContent } from "../../../../../hooks/docs/useSaveDocContent";
import useEditorStore from "../../../../../store/useEditorStore";

const DocumentInput = ({ id }: { id: string }) => {
  const { editor } = useEditorStore();
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

  //* save document content hook
  const { mutate: saveDocContent, isPending: isSaveDocContentPending } =
    useSaveDocContent({ isButton: false });
  // function
  const handleSaveDocContent = () => {
    if (!editor) return;
    saveDocContent({ id, content: editor.getHTML() });
  };
  // useEffect to set up auto-save every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      handleSaveDocContent();
    }, 25000); // 25 seconds

    return () => clearInterval(interval); // clear interval on component unmount
  }, [editor]);

  return (
    <div className={"flex items-center gap-2"}>
      {!isEditing ? (
        <span
          className={
            "text-md h-[30px] min-w-[150px] cursor-pointer truncate rounded-md px-1.5 hover:bg-gray-100"
          }
          onClick={handleEdit}
        >
          {isLoading ? "Untitled Document" : data?.document.name}
        </span>
      ) : (
        <Input
          value={docName}
          disabled={
            isPending || !isEditing || isLoading || isSaveDocContentPending
          }
          onChange={(e) => setDocName(e.target.value)}
          className={
            "text-md h-[30px] min-w-[150px] outline-none focus:outline-none"
          }
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await saveContent();
            }
          }}
        />
      )}

      {isPending || isSaveDocContentPending ? (
        <div className={"flex items-center gap-2"}>
          <Loader2Icon className={"size-4 animate-spin text-blue-500"} />
          <p className={"text-xs text-muted-foreground"}>Saving...</p>
        </div>
      ) : (
        <div className={"flex items-center gap-2"}>
          <BsCloudCheck className={"size-4 text-blue-500"} />
          <p className={"text-xs text-muted-foreground"}>Save</p>
        </div>
      )}
    </div>
  );
};
export default DocumentInput;
