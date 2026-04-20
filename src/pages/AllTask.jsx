import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router"

function getAllTask() {
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

        console.log(allTasks.data) // debug
        setTasks(allTasks.data)

    } catch (err) {
        console.log(err)
    }
}

    useEffect(()=>{
        getTasks()
    },[])

  return (
    <div>
    
    <h1>All Tasks </h1>
    {tasks.map((oneTask)=>
    <div key={oneTask._id}>
        <h1>{oneTask.title}</h1>
        <h3>{oneTask.description}</h3>
        <p>{oneTask.start}</p>
        <p>{oneTask.end}</p>
        <p>{oneTask.status}</p>
        <p>{oneTask.routine}</p>
        <p>{oneTask.priority}</p>
        <p>Created: {oneTask.createdAt}</p>
        <p>Updated: {oneTask.updatedAt}</p>
        <Link to={`/tasks/${oneTask._id}`}>See Details</Link>


    </div>
    
    
    )}
    
    {tasks.length === 0 && <h2> No Task Available</h2>}
    
    </div>
  )
}

export default getAllTask