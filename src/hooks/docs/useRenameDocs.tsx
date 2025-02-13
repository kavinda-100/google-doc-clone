"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameDoc } from "../../actions/DocActions";
import { toast } from "sonner";

export const useRenameDocs = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, docName }: { id: string; docName: string }) =>
      renameDoc({ id, name: docName }),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["getDocContent", { id }],
        });
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "Error in renaming document");
    },
  });

  return { mutate, isPending };
};
