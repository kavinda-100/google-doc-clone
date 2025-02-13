"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewDoc } from "../../actions/DocActions";
import { toast } from "sonner";

export const useCreateDocs = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id }: { id: string | null }) => createNewDoc({ id }),
    onError: (error) => {
      toast.error(error.message ?? "Error in creating document");
    },
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["all-documents"],
        });
        router.push(`/dashboard/edit/${data.docId}`);
      }
    },
  });

  return { mutate, isPending };
};
