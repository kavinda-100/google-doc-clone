import React from "react";
import CreateNewDoc from "../../components/dashboard/CreateNewDoc";
import AllDocuments from "../../components/dashboard/AllDocuments";

const Page = () => {
  return (
    <section className={"container mx-auto"}>
      {/*  templates */}
      <section className={"mx-auto my-4 w-full max-w-5xl"}>
        <h1 className={"mb-3 font-bold text-muted-foreground"}>Create One</h1>
        <CreateNewDoc />
      </section>
      {/*<Link href={`/dashboard/edit/cm6z62yky00057k6kc1bxwmop`}>*/}
      {/*  edit document*/}
      {/*</Link>*/}
      {/*  table */}
      <section className={"mx-auto my-4 w-full max-w-5xl"}>
        <h1 className={"mb-3 font-bold text-muted-foreground"}>
          Recent Documents
        </h1>
        <AllDocuments />
      </section>
    </section>
  );
};
export default Page;
