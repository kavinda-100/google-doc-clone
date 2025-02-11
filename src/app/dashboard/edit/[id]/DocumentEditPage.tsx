import React from "react";
import Editor from "../../../../TipTapEditer/Editor";
import ToolBar from "../../../../TipTapEditer/ToolBar";

const DocumentEditPage = ({ id }: { id: string }) => {
  return (
    <div className={"h-full w-full"}>
      <ToolBar />
      <Editor />
    </div>
  );
};
export default DocumentEditPage;
