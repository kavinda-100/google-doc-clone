"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { authClient } from "../../server/auth/auth-client";
import type { ErrorContext } from "@better-fetch/fetch";
import { toast } from "sonner";

const GithubButton = () => {
  const [loading, setLoading] = React.useState(false);

  const handleGithubLogin = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          setLoading(false);
          toast.success("Sign in successfully");
        },
        onError: (ctx: ErrorContext) => {
          setLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Button
      className={"w-full"}
      variant={"outline"}
      disabled={loading}
      onClick={handleGithubLogin}
    >
      {loading ? (
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
