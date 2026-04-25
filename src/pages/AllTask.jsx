import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router"

function GetAllTask() {
  const [tasks, setTasks] = useState([])

  async function getTasks() {
    try {
      const token = localStorage.getItem("token")

      const allTasks = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setTasks(allTasks.data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="container">

      <h1 style={{ textAlign: "center" }}>All Tasks</h1>

      <div className="tasks-grid">

        {tasks.map((oneTask) => (
          <div className="task-card" key={oneTask._id}>

            <h2>{oneTask.title}</h2>
            <p>{oneTask.description}</p>

            <p><b>Start:</b> {oneTask.start}</p>
            <p><b>End:</b> {oneTask.end}</p>
            <p><b>Status:</b> {oneTask.status}</p>
            <p><b>Routine:</b> {oneTask.routine}</p>
            <p><b>Priority:</b> {oneTask.priority}</p>

            <Link className="nav-item" to={`/tasks/${oneTask._id}`}>
              See Details
            </Link>

          </div>
        ))}

      </div>

      {tasks.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>
          No Task Available
        </h2>
      )}

    </div>
  )
}

export default GetAllTask