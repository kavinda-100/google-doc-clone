import React from "react";
import Image from "next/image";
import { getUserSession } from "../server/auth/getUserSession";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "./auth/SignOutButton";
import { ChevronDown } from "lucide-react";

const DashBoardHeader = async () => {
  const session = await getUserSession();
  return (
    <header
      className={
        "container mx-auto flex items-center justify-between gap-5 p-2"
      }
    >
      <div className={"flex items-center justify-center gap-3"}>
        <Image
          src={"/doc.svg"}
          alt={"Google-Docs-icon"}
          width={30}
          height={30}
        />
        <h1 className={"text-xl font-bold"}>Google Docs Clone</h1>
      </div>
      <div className={"flex items-center justify-center gap-3"}>
        <p className={"text-xs text-muted-foreground"}>
          Hi, {session?.user?.name}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={"flex cursor-pointer items-center gap-1 border-0"}
          >
            <Avatar>
              <AvatarImage
                src={session?.user?.image ?? ""}
                alt={session?.user?.name}
              />
              <AvatarFallback>
                {session?.user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className={"size-4"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"end"}>
            <DropdownMenuItem className={"w-full"}>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default DashBoardHeader;
