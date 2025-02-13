import React from "react";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const DashBoardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();
  console.log({ session });
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <main
      className={"container relative mx-auto flex min-h-screen flex-col p-2"}
    >
      <section className={"flex flex-1"}>{children}</section>
    </main>
  );
};
export default DashBoardLayout;
