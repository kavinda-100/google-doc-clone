"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDocs } from "../../actions/DocActions";
import { Skeleton } from "../ui/skeleton";
import { AllDocumentsColumnsDef } from "./table/AllDocumentsColumnsDef";
import { TableComponent } from "../table/TableComponent";

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
      <TableComponent
        columns={AllDocumentsColumnsDef}
        data={data?.documents ?? []}
        FilterInputPlaceholder={"Search By Document Name"}
        NameForFilter={"name"}
        showExportToExcel={false}
      />
    </section>
  );
};
export default AllDocuments;
