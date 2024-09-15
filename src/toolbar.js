// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="sliderNode" label="Slider" />
        <DraggableNode type="colorPickerNode" label="Picker" />
        <DraggableNode type="dropdownNode" label="Dropdown" />
        <DraggableNode type="progressNode" label="Progress" />
        <DraggableNode type="toggleNode" label="Toggle" />
      </div>
    </div>
  );
};
