import React from "react";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <section
      className={
        "container mx-auto flex min-h-screen flex-col items-center justify-center"
      }
    >
      {children}
    </section>
  );
};
export default AuthLayout;
