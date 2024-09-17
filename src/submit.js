import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { useState } from "react";
import { Modal } from "./modal"; // Import the Modal component

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const [error, setError] = useState(null); // State to store error messages
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [result, setResult] = useState(null); // State to store result data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Function to close the modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
    setError(null); // Clear error state
    setResult(null); // Clear result state
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    setError(null); // Clear any previous errors
    setResult(null); // Clear previous result

    const pipeline = { nodes, edges };
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipeline),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data); // Store the result
        setIsModalOpen(true); // Open the modal to show the result
      } else {
        setError("Error in response. Please try again."); // Set the error state
        setIsModalOpen(true); // Open the modal to show the error
        console.error("Error in response:", data);
      }
    } catch (error) {
      setError("Network error. Please check your connection."); // Set the error state
      setIsModalOpen(true); // Open the modal to show the error
      console.error("Error in submitting pipeline:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center space-y-4">
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      {/* Modal for displaying the result or error */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={error ? "Error" : "Pipeline Information"}
      >
        {error ? (
          <div className="text-red-600 font-semibold">{error}</div>
        ) : (
          result && (
            <div>
              <p>
                <strong>Number of Nodes:</strong> {result.num_nodes}
              </p>
              <p>
                <strong>Number of Edges:</strong> {result.num_edges}
              </p>
              <p>
                <strong>Is DAG:</strong> {result.is_dag ? "Yes" : "No"}
              </p>
            </div>
          )
        )}
      </Modal>
    </div>
  );
};
