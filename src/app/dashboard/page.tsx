import React from "react";
import CreateNewDoc from "../../components/dashboard/CreateNewDoc";

const Page = () => {
  return (
    <section className={"container mx-auto"}>
      {/*  templates */}
      <section className={"mx-auto my-4 w-full max-w-5xl"}>
        <h1 className={"mb-3 font-bold text-muted-foreground"}>Create One</h1>
        <CreateNewDoc />
      </section>
      {/*  table */}
      <section className={"mx-auto my-4 w-full max-w-5xl"}>
        <h1 className={"mb-3 font-bold text-muted-foreground"}>
          Recent Documents
        </h1>
      </section>
    </section>
  );
};
export default Page;
