import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard({ user }) {

  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])

  async function getData() {
    try {
      const token = localStorage.getItem("token")

      const tasksRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const catRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setTasks(tasksRes.data)
      setCategories(catRes.data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const completed = tasks.filter(t => t.status === "completed").length
  const pending = tasks.filter(t => t.status !== "completed").length

  return (
    <div className="container">

      <h1 className="dashboard-title">
        Welcome {user?.username}
      </h1>

      <p className="dashboard-subtitle">
        Here is your productivity overview
      </p>

      <div className="dashboard-grid">

        <div className="task-card stat-card">
          <h2>Total Tasks</h2>
          <p>{tasks.length}</p>
        </div>

        <div className="task-card stat-card">
          <h2>Completed</h2>
          <p>{completed}</p>
        </div>

        <div className="task-card stat-card">
          <h2>Pending</h2>
          <p>{pending}</p>
        </div>

        <div className="task-card stat-card">
          <h2>Categories</h2>
          <p>{categories.length}</p>
        </div>

      </div>

    </div>
  )
}

export default Dashboard