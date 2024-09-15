// LLMNode.js
import React from "react";
import { BaseNode } from "./baseNode/baseNode";
import { Position } from "reactflow";

export const LLMNode = (props) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${props.id}-system`,
      style: { top: "33%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${props.id}-prompt`,
      style: { top: "66%" },
    },
    { type: "source", position: Position.Right, id: `${props.id}-response` },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="LLM"
      handles={handles}
      renderContent={() => (
        <div className="flex flex-col items-center justify-center text-sm text-gray-700 p-2 border border-gray-300 rounded-md shadow-sm">
          <span className="font-semibold">This is an LLM Node.</span>
        </div>
      )}
    />
  );
};
