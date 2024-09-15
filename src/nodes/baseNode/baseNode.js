// BaseNode.js
import { Handle } from "reactflow";
import { useState } from "react";
import "./nodeStyles.css";

export const BaseNode = ({ id, data, nodeLabel, handles, renderContent }) => {
  const [currName, setCurrName] = useState(
    data?.name || id.replace("custom-", `${nodeLabel.toLowerCase()}_`)
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  return (
    <div className="node-container">
      <div className="node-header">{nodeLabel}</div>
      <div className="node-content">
        {renderContent ? (
          renderContent()
        ) : (
          <label className="node-label">
            Name:
            <input
              type="text"
              className="node-input"
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
