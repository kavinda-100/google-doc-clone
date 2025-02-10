import React from "react";
import Editor from "../../../../TipTapEditer/Editor";

const DocumentEditPage = ({ id }: { id: string }) => {
  return (
    <div className={"h-full w-full"}>
      <Editor />
    </div>
  );
};
export default DocumentEditPage;
