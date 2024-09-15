// ProgressNode.js
import React, { useState } from "react";
import { BaseNode } from "../baseNode/baseNode";
import { Position } from "reactflow";

export const ProgressNode = (props) => {
  const [progress, setProgress] = useState(props.data?.progress || 50);

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${props.id}-progress-output`,
    },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Progress"
      handles={handles}
      renderContent={() => (
        <div className="flex flex-col space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
            onChange={(e) => setProgress(e.target.value)}
          />
        </div>
      )}
    />
  );
};
