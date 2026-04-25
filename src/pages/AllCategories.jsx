import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h1>All Categories</h1>

      <Link to="/categories/create">➕ Create Category</Link>

      {categories.map((cat) => (
        <p key={cat._id}>{cat.name}</p>
      ))}

      {categories.length === 0 && <p>No categories found</p>}
    </div>
  );
}

export default AllCategories;
