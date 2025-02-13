"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const GithubButton = () => {
  const [isPending, setIsPending] = React.useState(false);

  const handleGithubLogin = async () => {
    try {
      setIsPending(true);
      await signIn("github", { redirectTo: "/dashboard" });
    } catch (e: unknown) {
      console.log("error in github login", e);
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      className={"w-full"}
      variant={"outline"}
      onClick={() => handleGithubLogin()}
      disabled={isPending}
    >
      {isPending ? (
        <span className={"flex items-center justify-center gap-3"}>
          <Loader2 className={"size-4 animate-spin"} />
          <span>Signing...</span>
        </span>
      ) : (
        <>
          <Image
            src={"/github.svg"}
            alt={"github-logo"}
            width={20}
            height={20}
          />
          <span>Continue with Github</span>
        </>
      )}
    </Button>
  );
};
export default GithubButton;
