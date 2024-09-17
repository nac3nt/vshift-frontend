import React, { useState, useEffect, useRef } from "react";
import { BaseNode } from "./baseNode/baseNode";
import { Position } from "reactflow";

// Helper function to extract variables inside {{}} from the input text
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
  let match;
  const variables = [];
  while ((match = regex.exec(text)) !== null) {
    variables.push(match[1]);
  }
  return variables;
};

export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "");
  const [leftHandles, setLeftHandles] = useState([]);
  const textAreaRef = useRef(null); // Ref for the textarea to auto adjust height

  useEffect(() => {
    // Extract variables from the input text
    const variables = extractVariables(currText);

    // Create handles for each detected variable with their positions
    const newHandles = variables.map((variable, index) => {
      const handleCount = variables.length;
      const nodeHeight = 100 + handleCount * 20; // Node height with added handles
      const gap = 20; // Space between each handle
      const topPosition =
        (index + 1) * gap + (nodeHeight - handleCount * gap) / 2;

      return {
        type: "target",
        position: Position.Left,
        id: `${props.id}-text-${variable}-input-${index}`,
        style: { top: `${topPosition}px`, position: "absolute" }, // Ensure each handle has a unique ID
      };
    });

    setLeftHandles(newHandles);
  }, [currText, props.id]);

  // Function to handle dynamic resizing of textarea based on content
  const handleTextareaChange = (e) => {
    const textareaLineHeight = 20; // Height of each line
    const linesCount = e.target.value.split("\n").length; // Count number of new lines
    const newHeight = Math.max(
      50 + linesCount * textareaLineHeight,
      50 + leftHandles.length * 20
    ); // Adjust height based on lines or handles

    // Update the textarea height and the content
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${newHeight}px`;
    }

    setCurrText(e.target.value); // Update the content of the textarea
  };

  const rightHandles = [
    { type: "source", position: Position.Right, id: `${props.id}-output` },
  ];

  // Dynamically calculate the height of the node based on handles and lines in the textarea
  const dynamicHeight = Math.max(100 + leftHandles.length * 20, 50);

  return (
    <BaseNode
      {...props}
      nodeLabel="Text"
      handles={[...leftHandles, ...rightHandles]}
      style={{ height: `${dynamicHeight}px` }} // Dynamic node height based on handles
      renderContent={() => (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <textarea
            ref={textAreaRef} // Reference to the textarea
            className="mt-1 block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            style={{ resize: "none" }} // Disable manual resize
            value={currText}
            onChange={handleTextareaChange} // Handle change to adjust height
          />
        </label>
      )}
    />
  );
};
