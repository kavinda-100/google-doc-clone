"use client";

import React from "react";
import { docTemplates } from "../../constans/docsTemplats";
import Image from "next/image";
import DashboardLoader from "../DashboardLoader";
import { useCreateDocs } from "../../hooks/docs/useCreateDocs";

const CreateNewDoc = () => {
  const { mutate, isPending } = useCreateDocs();
  return (
    <>
      {isPending && <DashboardLoader />}
      <div className={"flex w-full flex-wrap items-center justify-start gap-3"}>
        {docTemplates.map((template, index) => (
          <div
            className={
              "flex min-h-[150px] min-w-[150px] cursor-pointer flex-col items-center " +
              "border-0.5 justify-center gap-3 rounded-md border bg-background p-2 shadow-sm transition-all hover:shadow-md"
            }
            key={`${index}-${template.templateName}`}
            onClick={() => {
              mutate({ id: template.id });
            }}
          >
            <Image
              src={template.thumbnail}
              alt={template.templateName}
              width={100}
              height={100}
            />
            <p className={"text-left text-sm font-bold text-muted-foreground"}>
              {template.templateName}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default CreateNewDoc;
