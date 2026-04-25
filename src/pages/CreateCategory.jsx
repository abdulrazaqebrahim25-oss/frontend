import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function CreateCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/categories"); // go to list page after creation
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.err || "Failed to create category");
    }
  }

  return (
    <div>
      <h1>Create Category</h1>

      <form onSubmit={handleSubmit}>
        <label>Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
        />

        <button type="submit">Create</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreateCategory; 