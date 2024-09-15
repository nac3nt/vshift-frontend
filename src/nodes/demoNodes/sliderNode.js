// SliderNode.js
import React, { useState } from "react";
import { BaseNode } from "../baseNode/baseNode";
import { Position } from "reactflow";

export const SliderNode = (props) => {
  const [sliderValue, setSliderValue] = useState(props.data?.sliderValue || 50);

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${props.id}-slider-output`,
    },
  ];

  return (
    <BaseNode
      {...props}
      nodeLabel="Slider"
      handles={handles}
      renderContent={() => (
        <div className="flex flex-col space-y-2">
          <label className="text-sm">Value: {sliderValue}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
            onChange={(e) => setSliderValue(e.target.value)}
          />
        </div>
      )}
    />
  );
};
