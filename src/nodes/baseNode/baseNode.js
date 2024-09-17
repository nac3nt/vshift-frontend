import { Handle } from "reactflow";
import { useState } from "react";

export const BaseNode = ({ id, data, nodeLabel, handles, renderContent }) => {
  const [currName, setCurrName] = useState(
    data?.name || id.replace("custom-", `${nodeLabel.toLowerCase()}_`)
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <div className="min-w-[250px] bg-white min-h-20 border border-gray-600 p-6 flex flex-col rounded-lg justify-between shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
      {/* Update to increase the gap by using mb-4 */}
      <div className="font-bold text-left mb-6">{nodeLabel}</div>
      <div className="flex flex-col">
        {renderContent ? (
          renderContent()
        ) : (
          <label className="mb-2">
            Name:
            <input
              type="text"
              className="w-full p-1 border rounded"
              value={currName}
              onChange={handleNameChange}
            />
          </label>
        )}
      </div>
      {handles.map(({ type, position, id, style }, index) => (
        <Handle
          key={index}
          type={type}
          position={position}
          id={id}
          style={{
            ...style, // Keep the existing style properties
            width: 8, // Set the width to 10px
            height: 8, // Set the height to 10px
          }}
        />
      ))}
    </div>
  );
};
