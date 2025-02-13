"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "../../actions/DocActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteDocs = ({ id }: { id: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => deleteDocument({ id }),
    onError: (error) => {
      toast.error(error.message ?? "Error in deleting document");
    },
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["getDocContent", { id }],
        });
        router.push(`/dashboard`);
      }
    },
  });

  return { mutate, isPending };
};
