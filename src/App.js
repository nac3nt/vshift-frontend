import { useState, useEffect, useRef } from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  const [isToolbarVisible, setToolbarVisible] = useState(false);
  const toolbarRef = useRef(null);
  const buttonRef = useRef(null); // Reference for the toggle button

  // Toggle toolbar visibility when the button is clicked
  const toggleToolbar = () => {
    setToolbarVisible(!isToolbarVisible);
  };

  // Detect click outside the toolbar or the button to close the toolbar
  useEffect(() => {
    function handleClickOutside(event) {
      // Close the toolbar if click is outside the toolbar and not on the button
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setToolbarVisible(false); // Close the toolbar
      }
    }

    // Add event listener when toolbar is visible
    if (isToolbarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when component unmounts or toolbar closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToolbarVisible]);

  return (
    <div className="relative flex flex-col h-screen">
      {/* + Button to toggle the toolbar */}
      <button
        ref={buttonRef} // Reference to the button element
        onClick={toggleToolbar}
        className="absolute top-4 left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl hover:bg-blue-600 transition z-30"
      >
        {isToolbarVisible ? "✕" : "+"}
      </button>

      {/* Toolbar that shows/hides based on state */}
      {isToolbarVisible && (
        <div
          ref={toolbarRef} // Reference to the toolbar element
          className="absolute top-16 left-4 z-20 w-[300px] p-4 bg-white shadow-lg border rounded-lg"
        >
          <PipelineToolbar />
        </div>
      )}

      {/* Pipeline UI that takes up remaining space */}
      <div className="flex-grow z-10">
        <PipelineUI />
      </div>

      {/* Submit button at the bottom */}
      <div className="flex-shrink-0">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
