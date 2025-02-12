"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs } from "../../actions/DocActions";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const AllDocuments = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["all-documents"],
    queryFn: getDocs,
  });
  if (isLoading) {
    return <Skeleton className={"h-full min-h-[300px] w-full"} />;
  }
  if (error) {
    return <div className={"text-md text-red-500"}>Error: {error.message}</div>;
  }
  return (
    <section className={"h-full w-full"}>
      {data?.documents.map((doc) => {
        return (
          <Link href={`/dashboard/edit/${doc.id}`} key={doc.id}>
            <div className={"my-2 rounded-md border border-gray-200 p-2"}>
              <h3 className={"text-md font-bold"}>{doc.name}</h3>
              <p className={"text-sm text-gray-500"}>{doc.userId}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};
export default AllDocuments;
