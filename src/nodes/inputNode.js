// InputNode.js
import React, { useState } from "react";
import { BaseNode } from "./baseNode/baseNode";
import { Position } from "reactflow";

export const InputNode = (props) => {
  const [inputType, setInputType] = useState(props.data.inputType || "Text");

  const handles = [
    { type: "source", position: Position.Right, id: `${props.id}-value` },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Input"
      handles={handles}
      renderContent={() => (
        <>
          <label className="node-label">
            Name:
            <input
              type="text"
              className="node-input"
              value={props.data?.inputName}
              onChange={(e) => setInputType(e.target.value)}
            />
          </label>
          <label className="node-label">
            Type:
            <select
              className="node-select"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        </>
      )}
    />
  );
};
