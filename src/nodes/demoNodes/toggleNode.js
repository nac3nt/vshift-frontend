// ToggleNode.js
import React, { useState } from "react";
import { BaseNode } from "../baseNode/baseNode";
import { Position } from "reactflow";

export const ToggleNode = (props) => {
  const [isToggled, setIsToggled] = useState(props.data?.isToggled || false);

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${props.id}-toggle-output`,
    },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Toggle"
      handles={handles}
      renderContent={() => (
        <div className="flex flex-col space-y-2">
          <input
            type="checkbox"
            checked={isToggled}
            className="w-6 h-6 cursor-pointer"
            onChange={(e) => setIsToggled(e.target.checked)}
          />
        </div>
      )}
    />
  );
};
