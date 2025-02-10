import React from "react";
import { getUserSession } from "../../server/auth/getUserSession";
import { redirect } from "next/navigation";

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getUserSession();
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
