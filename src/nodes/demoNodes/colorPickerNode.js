// ColorPickerNode.js
import React, { useState } from "react";
import { BaseNode } from "../baseNode/baseNode";
import { Position } from "reactflow";

export const ColorPickerNode = (props) => {
  const [selectedColor, setSelectedColor] = useState(
    props.data?.selectedColor || "#000000"
  );

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${props.id}-color-output`,
    },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Color Picker"
      handles={handles}
      renderContent={() => (
        <div className="flex flex-col space-y-2">
          <label className="text-sm">Select Color:</label>
          <input
            type="color"
            value={selectedColor}
            className="w-full h-8 p-0 cursor-pointer"
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>
      )}
    />
  );
};
