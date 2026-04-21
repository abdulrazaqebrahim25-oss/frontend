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


const [categories, setCategories] = useState([]);
const [dbReminders, setDbReminders] = useState([]);
const [msg, setMsg] = useState('');
const [time, setTime] = useState('');

useEffect(() => {
  const token = localStorage.getItem('token');
  
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
    .then(res => setCategories(res.data));

  axios.get(`${import.meta.env.VITE_BACKEND_URL}/reminders/task/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => setDbReminders(res.data));
}, [id]);

const handleCreateReminder = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reminders`, 
    { message: msg, remindAt: time, taskID: id }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  setDbReminders([...dbReminders, res.data]);
  setMsg('');
  setTime('');
};

const handleDeleteReminder = async (rid) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reminders/${rid}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  setDbReminders(dbReminders.filter(r => r._id !== rid));
};


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

        <form onSubmit={handleSubmit}>
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


<label>Category:</label>
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