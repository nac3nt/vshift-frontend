export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} cursor-grab flex items-center rounded-lg bg-gray-800 hover:bg-gray-700 text-white justify-center flex-col px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <span className="text-white">{label}</span>
    </div>
  );
};
