import React from "react";
import Editor from "../../../../TipTapEditer/Editor";
import ToolBar from "../../../../TipTapEditer/ToolBar";
import NavBar from "./_navbar/NavBar";

const DocumentEditPage = ({ id }: { id: string }) => {
  return (
    <div className={"h-full w-full"}>
      <div
        className={
          "fixed left-0 top-0 z-10 flex w-full flex-col gap-y-2 bg-background px-4 pt-2 print:hidden"
        }
      >
        <NavBar id={id} />
        <ToolBar />
      </div>
      <div className={"pt-[110px] print:pt-0"}>
        <Editor />
      </div>
    </div>
  );
};
export default DocumentEditPage;
