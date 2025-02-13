import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";
import GithubButton from "../../../components/auth/GithubButton";

const SignInPage = () => {
  return (
    <Card className={"w-full min-w-[300px] max-w-lg"}>
      <CardHeader className={"flex flex-col gap-4"}>
        <CardTitle
          className={
            "flex items-center justify-center gap-3 text-2xl font-bold"
          }
        >
          Sign In
          <Image src={"/lock.svg"} alt={"lock-image"} width={30} height={30} />
        </CardTitle>
        <CardDescription>Sign In to Your account</CardDescription>
      </CardHeader>
      <CardContent>
        <GithubButton />
      </CardContent>
    </Card>
  );
};
export default SignInPage;
