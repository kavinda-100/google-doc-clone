"use client";

import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { useRulerStore } from "../store/useRulerStore";

const markers = Array.from({ length: 80 }, (_, i) => i + 1);

const Ruler = () => {
  // Constants
  const PAGE_WIDTH = 816;
  const MINIMUM_MARGIN = 56;
  const MAXIMUM_SPACE = 100;

  const { rightMargin, leftMargin, setRightMargin, setLeftMargin } =
    useRulerStore();
  const [isDraggingLeft, setIsDraggingLeft] = React.useState(false);
  const [isDraggingRight, setIsDraggingRight] = React.useState(false);
  const rulerRef = React.useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMargin - MAXIMUM_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition); //! Make collaboration
        }
        if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMargin + MAXIMUM_SPACE);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition,
          );
          setRightMargin(constrainedRightPosition); //! Make collaboration
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(MINIMUM_MARGIN);
  };
  const handleRightDoubleClick = () => {
    setRightMargin(MINIMUM_MARGIN);
  };
  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={
        "relative mx-auto flex h-6 w-[816px] select-none items-end border-b border-gray-300 print:hidden"
      }
    >
      <div id="ruler-container" className={"relative h-full w-full"}>
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className={"absolute inset-x-0 bottom-0 h-full"}>
          <div className={`relative h-full w-[${PAGE_WIDTH}px]`}>
            {markers.map((marker) => {
              const position = (marker * PAGE_WIDTH) / 80;
              return (
                <div
                  key={marker}
                  className={"absolute bottom-0"}
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div
                        className={
                          "absolute bottom-0 h-2 w-[1px] bg-neutral-500"
                        }
                      />
                      <span
                        className={
                          "absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-500"
                        }
                      >
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <>
                      <div
                        className={
                          "absolute bottom-0 h-1.5 w-[1px] bg-neutral-500"
                        }
                      />
                      <span
                        className={
                          "absolute bottom-1 -translate-x-1/2 transform text-[10px] text-neutral-500"
                        }
                      >
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 !== 0 && (
                    <>
                      <div
                        className={
                          "absolute bottom-0 h-1 w-[1px] bg-neutral-400"
                        }
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ruler;

type MarkerProps = {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
};

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className={"group absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize"}
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown
        className={
          "absolute left-1/2 top-0 h-full -translate-x-1/2 transform fill-blue-500"
        }
      />
      <div
        className={"absolute left-1/2 top-4 -translate-x-1/2 transform"}
        style={{
          opacity: isDragging ? 1 : 0,
          height: "100vh",
          width: "1px",
          transform: "translateX(0.5)",
          backgroundColor: "#3b72f6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
};
