// TextNode.js
import React, { useState } from "react";
import { BaseNode } from "./baseNode/baseNode";
import { Position } from "reactflow";

export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "{{input}}");

  const handles = [
    { type: "source", position: Position.Right, id: `${props.id}-output` },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Text"
      handles={handles}
      renderContent={() => (
        <label className="node-label">
          Text:
          <input
            type="text"
            className="node-input"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
          />
        </label>
      )}
    />
  );
};
