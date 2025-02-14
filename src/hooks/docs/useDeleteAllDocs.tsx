"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllDocs } from "../../actions/DocActions";
import { toast } from "sonner";

export const useDeleteAllDocs = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ docIds }: { docIds: string[] }) =>
      deleteAllDocs({ docIds }),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["all-documents"],
        });
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to delete documents");
    },
  });

  return { mutate, isPending };
};
