import React from "react";
import { Loader } from "lucide-react";
import { cn } from "../lib/utils";

type DashboardLoaderProps = {
  className?: string;
};

const DashboardLoader = ({ className }: DashboardLoaderProps) => {
  return (
    <div
      className={cn(
        "z-1000 container absolute left-0 top-0 mx-auto flex h-full flex-col items-center justify-center bg-opacity-50 backdrop-blur-sm",
        className,
      )}
    >
      <Loader className={"size-7 animate-spin"} />
    </div>
  );
};
export default DashboardLoader;
