import React from "react";
import DocumentEditPage from "./DocumentEditPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <section className={"container mx-auto p-2"}>
      <DocumentEditPage id={id} />
    </section>
  );
};
export default Page;
