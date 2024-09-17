import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
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
