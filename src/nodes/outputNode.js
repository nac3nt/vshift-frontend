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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name:
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={props.data?.outputName}
              onChange={(e) => setOutputType(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-2">
            Type:
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
