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
        <div>
          <span>This is an LLM Node.</span>
        </div>
      )}
    />
  );
};
