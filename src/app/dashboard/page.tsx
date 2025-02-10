import React from "react";
import CreateNewDoc from "../../components/dashboard/CreateNewDoc";

const Page = () => {
  return (
    <section className={"container mx-auto"}>
      {/*  templates */}
      <section className={"mx-auto my-4 w-full max-w-5xl"}>
        <CreateNewDoc />
      </section>
      {/*  table */}
      <section></section>
    </section>
  );
};
export default Page;
