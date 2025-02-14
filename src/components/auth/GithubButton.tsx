"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { CiCircleCheck } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { cn } from "../../lib/utils";

const GithubButton = () => {
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleGithubLogin = async () => {
    try {
      setIsPending(true);
      await signIn("github", { redirectTo: "/dashboard" });
      setSuccess("Successfully signed in");
    } catch (e: unknown) {
      console.log("error in github login", e);
      setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={"flex w-full flex-col gap-4"}>
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
      {error && <MessageBox message={error} isError={true} />}
      {success && <MessageBox message={success} isError={false} />}
    </div>
  );
};
export default GithubButton;

const MessageBox = ({
  message,
  isError,
}: {
  message: string;
  isError: boolean;
}) => {
  return (
    <div
      className={cn("flex items-center gap-2 rounded-md border p-2", {
        "border-red-500 bg-red-100 text-red-500": isError,
        "border-emerald-500 bg-emerald-100 text-emerald-500": !isError,
      })}
    >
      {isError ? (
        <MdErrorOutline className={"size-5 fill-red-500"} />
      ) : (
        <CiCircleCheck className={"size-5 fill-emerald-500"} />
      )}
      <span>{message}</span>
    </div>
  );
};
