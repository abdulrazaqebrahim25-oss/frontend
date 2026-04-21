import { useState, useEffect } from "react"
import axios from "axios"

function Category() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")

  const getCategories = async () => {
    const res = await axios.get("http://localhost:3000/categories")
    setCategories(res.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const addCategory = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:3000/categories", { name })
    setName("")
    getCategories()
  }

  return (
    <div>
      <h2>Categories</h2>

      <form onSubmit={addCategory}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category"
        />
        <button>Add</button>
      </form>

      {categories.map((cat) => (
        <p key={cat._id}>{cat.name}</p>
      ))}
    </div>
  )
}

export default Category