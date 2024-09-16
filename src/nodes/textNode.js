import React, { useState, useEffect } from "react";
import { BaseNode } from "./baseNode/baseNode";
import { Position } from "reactflow";

// Helper function to extract variables inside {{}} from the input text
const extractVariables = (text) => {
  const regex = /\{\{(\w+)\}\}/g;
  let match;
  const variables = [];
  while ((match = regex.exec(text)) !== null) {
    variables.push(match[1]); // Extract the variable name
  }
  return variables;
};

export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "{{input}}");
  const [leftHandles, setLeftHandles] = useState([]);

  useEffect(() => {
    // Extract variables from the input text
    const variables = extractVariables(currText);

    // Create handles for each detected variable with their positions
    const newHandles = variables.map((variable, index) => {
      // Calculate dynamic top position based on index
      const handleCount = variables.length;
      const nodeHeight = 100 + handleCount * 20; // Node height with added handles
      const gap = 20; // Space between each handle
      const topPosition =
        (index + 1) * gap + (nodeHeight - handleCount * gap) / 2;

      return {
        type: "target",
        position: Position.Left,
        id: `${props.id}-input-${variable}-${index}`,
        style: { top: `${topPosition}px` }, // Apply calculated top position
      };
    });

    // Update state with new handles
    setLeftHandles(newHandles);
  }, [currText, props.id]);

  const rightHandles = [
    { type: "source", position: Position.Right, id: `${props.id}-output` },
  ];

  // Calculate dynamic height based on the number of left handles
  const dynamicHeight = 100 + leftHandles.length * 20; // base height + extra per handle
  const textAreaHeight = 50 + leftHandles.length * 20; // adjust text area height similarly

  return (
    <BaseNode
      {...props}
      nodeLabel="Text"
      handles={[...leftHandles, ...rightHandles]} // Combine left and right handles
      renderContent={() => (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text:
          <textarea
            className="mt-1 block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            style={{ height: `${textAreaHeight}px`, resize: "none" }}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
          />
        </label>
      )}
    />
  );
};
