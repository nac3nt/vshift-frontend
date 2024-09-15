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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text:
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
          />
        </label>
      )}
    />
  );
};
