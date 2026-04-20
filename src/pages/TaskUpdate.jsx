import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router"

function UpdateTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    status: "pending",
    routine: "one-time",
    priority: "medium",
    category: ""
  })

  const [loading, setLoading] = useState(true)

  const { id } = useParams()
  const navigate = useNavigate()

  // GET TASK
  async function getTask() {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setFormData({
        title: res.data.title || "",
        description: res.data.description || "",
        start: res.data.start ? res.data.start.split("T")[0] : "",
        end: res.data.end ? res.data.end.split("T")[0] : "",
        status: res.data.status || "pending",
        routine: res.data.routine || "one-time",
        priority: res.data.priority || "medium",
        category: res.data.category || ""
      })

      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  // HANDLE INPUT CHANGE
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // SUBMIT UPDATE
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate(`/tasks/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Update Task</h1>

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Start Date</label>
        <input
          type="date"
          name="start"
          value={formData.start}
          onChange={handleChange}
        />

        <label>End Date</label>
        <input
          type="date"
          name="end"
          value={formData.end}
          onChange={handleChange}
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label>Routine</label>
        <select
          name="routine"
          value={formData.routine}
          onChange={handleChange}
        >
          <option value="one-time">One Time</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="very-low">Very Low</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>


        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <button type="submit">Update Task</button>
      </form>
    </div>
  )
}

export default UpdateTask