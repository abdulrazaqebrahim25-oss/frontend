import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function CreateTask() {
    const[formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    status: 'pending',
    routine: 'one-time',
    priority: 'medium',
    category: ''
    })

    const navigate = useNavigate()

    function handleChange(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
        const token = localStorage.getItem('token')
        const createdTask = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`,formData,{headers:{Authorization:`Bearer ${token}`}})
        navigate(`/tasks/${createdTask.data._id}`)
        console.log(formData)
        console.log(createdTask.data)

        }
        catch(err){
            console.log(err)
        }

    }


  return (
    <div>
        <h1>Crate New Task</h1>

        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input value={formData.title} onChange={handleChange} name='title' type="text" />
        <label htmlFor="description">Description:</label>
        <input value={formData.description} onChange={handleChange} name='description' type="text" />

        <label htmlFor="start">Start:</label>
        <input type="date" name='start' value={formData.start} onChange={handleChange} />
        <label htmlFor="end">End:</label>
        <input type="date" name='end' value={formData.end} onChange={handleChange} />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

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

  
      <label htmlFor="category">Category</label>
      <input type="text" name='category' onChange={handleChange} value={formData.category} />


    <button type="submit">Create Task</button>

        </form>

    </div>
  )
}

export default CreateTask