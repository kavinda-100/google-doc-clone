import React from "react";
import { BsCloudCheck } from "react-icons/bs";

const DocumentInput = () => {
  return (
    <div className={"flex items-center gap-2"}>
      <span className={"text-md cursor-pointer truncate px-1.5"}>
        Untitled Document
      </span>
      <BsCloudCheck className={"text-blue-500"} />
    </div>
  );
};
export default DocumentInput;
