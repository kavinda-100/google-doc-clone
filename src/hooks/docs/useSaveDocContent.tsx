"use client";

import { useMutation } from "@tanstack/react-query";
import { saveDocContent } from "../../actions/DocActions";
import { toast } from "sonner";

export const useSaveDocContent = ({ isButton }: { isButton: boolean }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) =>
      saveDocContent({ id, content }),
    onError: (error) => {
      console.log("Error in saveDocContent: ", error);
      toast.error(error.message ?? "Error in saving document");
    },
    onSuccess: (data) => {
      if (data.success) {
        console.log("Document saved successfully");
        if (isButton) {
          toast.success(data.message);
        }
      }
    },
  });

  return { mutate, isPending };
};
