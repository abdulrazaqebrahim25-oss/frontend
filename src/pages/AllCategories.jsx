import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import "../App.css";

function AllCategories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container">

      <h1 className="page-title">All Categories</h1>

      <div className="center-link">
        <Link className="nav-item" to="/categories/create">
          ➕ Create Category
        </Link>
      </div>

      <div className="cards-grid">

        {categories.map((cat) => (
          <div className="card" key={cat._id}>
            <h2>{cat.name}</h2>

            <button className="delete-btn" onClick={() => handleDelete(cat._id)}>
              Delete
            </button>
          </div>
        ))}

      </div>

      {categories.length === 0 && (
        <p className="empty-text">No categories found</p>
      )}

    </div>
  );
}

export default AllCategories;