"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const SignOutButton = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut({ redirectTo: "/" });
    } catch (error) {
      console.error("Failed to sign out", error);
      toast.error("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      variant={"outline"}
      className={"w-full"}
      onClick={() => handleSignOut()}
      disabled={loading}
    >
      {loading ? <Loader2 className={"size-4 animate-spin"} /> : "Sign Out"}
    </Button>
  );
};
export default SignOutButton;
