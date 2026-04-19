import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router"

function UpdateTask() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
        status: '',
        routine: '',
        priority: '',
        category: ''
    })

    const { id } = useParams()
    const navigate = useNavigate()

    async function getTask(){
        const foundTask = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`)

        setFormData(foundTask.data)

    }

    useEffect(()=>{
        getTask()
    },[])

        function handleChange(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
        const token = localStorage.getItem('token')
        const createdTask = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,formData,{headers:{Authorization:`Bearer ${token}`}})
        navigate(`/tasks/${createdTask.data._id}`)

        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div>
        <h1>Update Task</h1>

        <form onSubmit={handleChange}>
        <label htmlFor="title">Title:</label>
        <input value={formData.title} onChange={handleChange} name='title' type="text" />
        <label htmlFor="description">Description:</label>
        <input value={formData.description} onChange={handleChange} name='description' type="text" />

        <input type="date" name='start' value={formData.start} onChange={handleChange} />
        <input type="date" name='end' value={formData.start} onChange={handleChange} />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="routine"
        value={form.routine}
        onChange={handleChange}
      >
         <option value="one-time">One Time</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>          

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="very-low">Very Low</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select> 

    <button type="submit">Update Task</button>
            </form>
    </div>
  )
}

export default UpdateTask