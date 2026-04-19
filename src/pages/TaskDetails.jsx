import { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router'


function TaskDetails({ user }) {
    const [task, setTask] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    async function getOneTask(){
        try{
            const oneTask = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`)
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

    useEffect(()=>{
        getOneHoot()
    },[])

  return (
    <div>
        <h1>Task Details</h1>

            title: '',
    description: '',
    start: '',
    end: '',
    status: '',
    routine: '',
    priority: '',
    category: ''

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

            
            {user?._id === task.uasername._id ? (
                <>
                <button onClick={deleteHoot}>Delete</button>
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

export default HootDetails