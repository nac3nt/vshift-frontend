// DropdownNode.js
import React, { useState } from "react";
import { BaseNode } from "../baseNode/baseNode";
import { Position } from "reactflow";

export const DropdownNode = (props) => {
  const [selectedOption, setSelectedOption] = useState(
    props.data?.selectedOption || "Option 1"
  );

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${props.id}-dropdown-output`,
    },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Dropdown"
      handles={handles}
      renderContent={() => (
        <div className="flex flex-col space-y-2">
          <label className="text-sm">Choose an option:</label>
          <select
            value={selectedOption}
            className="w-full p-2 border rounded"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
      )}
    />
  );
};
