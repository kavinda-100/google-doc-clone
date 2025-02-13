"use client";

import { useQuery } from "@tanstack/react-query";
import { getDocContent } from "../../actions/DocActions";

export const useGetDocContent = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getDocContent", { id }],
    queryFn: async () => getDocContent({ id }),
  });

  return { data, isLoading, error };
};
