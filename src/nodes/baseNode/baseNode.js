// BaseNode.js
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
    <div className="min-w-48 bg-white min-h-20 border border-gray-800 p-2 flex flex-col justify-between shadow-custom">
      <div className="font-bold text-center">{nodeLabel}</div>
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
          style={style}
        />
      ))}
    </div>
  );
};
