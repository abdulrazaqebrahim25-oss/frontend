import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router"

function UpdateTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const baseURL = "http://localhost:3000"
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

  const [categories, setCategories] = useState([])
  const [dbReminders, setDbReminders] = useState([])
  const [msg, setMsg] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('token')
        const baseURL = import.meta.env.VITE_BACKEND_URL

        // 1. Get Task
        const resTask = await axios.get(`${baseURL}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        setFormData({
          ...resTask.data,
          start: resTask.data.start ? resTask.data.start.split("T")[0] : "",
          end: resTask.data.end ? resTask.data.end.split("T")[0] : ""
        })

        // 2. Get Categories (Fixed to singular 'category')
        const resCats = await axios.get(`${baseURL}/category`)
        setCategories(resCats.data)

        // 3. Get Reminders
        const resRem = await axios.get(`${baseURL}/reminder/task/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setDbReminders(resRem.data)

        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    getData()
  }, [id])

const handleCreateReminder = async () => {
  const token = localStorage.getItem('token')
  
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reminder`, 
      { message: msg, remindAt: time, taskID: id }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    
    setDbReminders([...dbReminders, res.data])

    const newLocalReminder = { msg: msg, time: time }
    const existing = JSON.parse(localStorage.getItem('localReminders') || "[]")
    existing.push(newLocalReminder)
    localStorage.setItem('localReminders', JSON.stringify(existing))

    setMsg('')
    setTime('')
    alert("Reminder set successfully!")

  } catch (err) {
    const newLocalReminder = { msg: msg, time: time }
    const existing = JSON.parse(localStorage.getItem('localReminders') || "[]")
    existing.push(newLocalReminder)
    localStorage.setItem('localReminders', JSON.stringify(existing))

    setMsg('')
    setTime('')
    alert("Reminder saved to browser!")
  }
}

  const handleDeleteReminder = async (rid) => {
    const token = localStorage.getItem('token')
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reminders/${rid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setDbReminders(dbReminders.filter(r => r._id !== rid))
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
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
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label>Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />

        <label>Start Date</label>
        <input type="date" name="start" value={formData.start} onChange={handleChange} />

        <label>End Date</label>
        <input type="date" name="end" value={formData.end} onChange={handleChange} />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label>Priority</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="very-low">Very Low</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>

        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <hr />
        <h3>Reminders</h3>
        {dbReminders.map((r) => (
          <div key={r._id}>
            <span>{r.message}</span>
            <button type="button" onClick={() => handleDeleteReminder(r._id)}>Delete</button>
          </div>
        ))}
        <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="New message" />
        <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} />
        <button type="button" onClick={handleCreateReminder}>Add Reminder</button>

        <button type="submit">Update Task</button>
      </form>
    </div>
  )
}

export default UpdateTask