import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import '../App.css'


function CreateCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

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

      navigate("/categories");
    } catch (err) {
  console.log(err.response);
  setError(err.response?.data?.err || err.message);
}
  }

  return (
    <div className="container">
      <Link to="/categories" className="nav-item">
        ← Back to All Categories
      </Link>

      <h1>Create Category</h1>

      <form onSubmit={handleSubmit}>
        <label>Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          required
        />

        <button type="submit">Create</button>
      </form>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default CreateCategory;