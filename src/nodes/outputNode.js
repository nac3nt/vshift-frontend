// OutputNode.js
import React, { useState } from "react";
import { BaseNode } from "./baseNode/baseNode";
import { Position } from "reactflow";

export const OutputNode = (props) => {
  const [outputType, setOutputType] = useState(props.data.outputType || "Text");

  const handles = [
    { type: "target", position: Position.Left, id: `${props.id}-value` },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Output"
      handles={handles}
      renderContent={() => (
        <>
          <label className="node-label">
            Name:
            <input
              type="text"
              className="node-input"
              value={props.data?.outputName}
              onChange={(e) => setOutputType(e.target.value)}
            />
          </label>
          <label className="node-label">
            Type:
            <select
              className="node-select"
              value={outputType}
              onChange={(e) => setOutputType(e.target.value)}
            >
              <option value="Text">Text</option>
              <option value="File">Image</option>
            </select>
          </label>
        </>
      )}
    />
  );
};
