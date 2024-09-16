// submit.js
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

export const SubmitButton = () => {
  // Get nodes and edges from the zustand store
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  // Function to handle form submission
  const handleSubmit = async () => {
    const pipeline = { nodes, edges };
    console.log(pipeline);
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
        // Display alert with the number of nodes, edges, and whether it's a DAG
        alert(
          `Number of nodes: ${data.num_nodes}, Number of edges: ${data.num_edges}, Is DAG: ${data.is_dag}`
        );
      } else {
        console.error("Error in response:", data);
      }
    } catch (error) {
      console.error("Error in submitting pipeline:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
