"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "../../actions/DocActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteDocs = ({
  id,
  isNavigate = true,
}: {
  id: string;
  isNavigate?: boolean;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => deleteDocument({ id }),
    onError: (error) => {
      toast.error(error.message ?? "Error in deleting document");
    },
    onSuccess: async (data) => {
      if (data.success) {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["all-documents"],
        });
        if (isNavigate) {
          router.push("/dashboard");
        }
      }
    },
  });

  return { mutate, isPending };
};
