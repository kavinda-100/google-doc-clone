import React from "react";
import { getUserSession } from "../../server/auth/getUserSession";
import { redirect } from "next/navigation";

const DashBoardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getUserSession();
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
