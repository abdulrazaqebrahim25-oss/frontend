import { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router'


function TaskDetails({ user }) {
    const [task, setTask] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    async function getOneTask(){
        try{
            const token = localStorage.getItem('token')
    
            const oneTask = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
    
            setTask(oneTask.data)
        }
        catch(err){
            console.log(err)
        }
    }
        
    async function deleteTask(){
        try{
            const token = localStorage.getItem('token')
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,{headers:{Authorization: `Bearer ${token}`}})
            navigate('/tasks')
        }
        catch(err){
            console.log(err)

        }
    }
    
    useEffect(() => {
        getOneTask()
    }, [])
    
  return (
    <div>
        <h1>Task Details</h1>

        { task ? 
        (<>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.start}</p>
            <p>{task.end}</p>
            <p>{task.status}</p>
            <p>{task.routine}</p>
            <p>{task.priority}</p>
            <p>{task.category}</p>

            
            {user?._id == task?.username._id ?(
                <>
                <button onClick={deleteTask}>Delete</button>
                <Link to={`/tasks/edit/${id}`}>Edit</Link>

                </>
                ) : <></>}
            

           
        </>) 
        : 
        (<>
            <p>Loading...</p>
        </>)
        }
    </div>
  )
}

export default TaskDetails