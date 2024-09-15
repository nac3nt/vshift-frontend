// TextNode.js
import React, { useState, useEffect } from "react";
import { BaseNode } from "./baseNode/baseNode";
import { Position } from "reactflow";

export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "{{input}}");
  const [handles, setHandles] = useState([
    { type: "source", position: Position.Right, id: `${props.id}-output` }, // Initial output handle
  ]);
  const [nodeHeight, setNodeHeight] = useState(100); // Initial node height

  // Regex to detect valid JavaScript variable names inside {{ }}
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g;

  // Update handles based on variables found in the text
  const updateHandles = (text) => {
    const baseHandle = {
      type: "source",
      position: Position.Right,
      id: `${props.id}-output`,
    };

    const matches = [...text.matchAll(variableRegex)];

    // Calculate the dynamic height based on the number of handles
    const numHandles = matches.length;
    const newHeight = Math.max(100, 10 + numHandles * 10); // Minimum height of 100, increase 40px per handle
    setNodeHeight(newHeight);

    // Create plain handle objects for each detected variable inside {{}}
    const variableHandles = matches.map((match, index) => ({
      type: "target",
      position: Position.Left,
      id: `${props.id}-${match[1]}`, // Unique ID for each variable
      style: { top: `${(index + 1) * (newHeight / (numHandles + 1))}px` }, // Center handles based on the new height
    }));

    // Combine the base output handle and the dynamically created variable handles
    setHandles([baseHandle, ...variableHandles]);
  };

  // Handle text changes and update handles
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateHandles(newText);
  };

  // Dynamically adjust textarea height based on content
  const adjustHeight = (e) => {
    e.target.style.height = "auto"; // Reset height first
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
  };

  useEffect(() => {
    updateHandles(currText); // Initialize handles when the component loads
  }, []);

  return (
    <BaseNode
      {...props}
      nodeLabel="Text"
      handles={handles} // Pass plain handle configuration objects
      style={{ height: `${nodeHeight}px` }} // Dynamically adjust node height
      renderContent={() => (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text:
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={currText}
            onChange={handleTextChange}
            onInput={adjustHeight} // Adjust height dynamically as user types
            style={{
              width: "100%",
              minHeight: "50px",
              resize: "none",
              overflow: "hidden",
            }} // Initial textarea styling
          />
        </label>
      )}
    />
  );
};
