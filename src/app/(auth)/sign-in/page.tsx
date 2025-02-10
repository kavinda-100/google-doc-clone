import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";
import GithubButton from "../../../components/auth/GithubButton";
import Link from "next/link";

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
      <CardFooter>
        <p className={"text-sm"}>
          Dont&apos;t have an account?{" "}
          <Link
            href={"/sign-up"}
            className={"ml-3 text-blue-400 underline hover:text-blue-600"}
          >
            Sign-Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default SignInPage;
