"use client";

import React from "react";
import { Button } from "../ui/button";
import { authClient } from "../../server/auth/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SignOutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in"); // redirect to sign in page
          },
        },
      });
    } catch (e) {
      console.log("error in handleSignOut:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handleSignOut}
      disabled={loading}
      variant={"ghost"}
      className={"w-full"}
    >
      {loading ? <Loader2 className={"size-4 animate-spin"} /> : "Sign out"}
    </Button>
  );
};
export default SignOutButton;
