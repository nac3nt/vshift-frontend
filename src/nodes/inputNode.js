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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={props.data?.inputName}
              onChange={(e) => e.target.value}
            />
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-2">
            Type
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={inputType}
              onChange={(e) => e.target.value}
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
