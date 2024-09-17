import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <PipelineToolbar />
      </div>

      <div className="flex-grow overflow-auto">
        <PipelineUI />
      </div>

      <div className="flex-shrink-0">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
