import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router'

function TaskDetails({ user }) {
  const [task, setTask] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loadingAI, setLoadingAI] = useState(false)

  const messagesEndRef = useRef(null)

  const { id } = useParams()
  const navigate = useNavigate()

  
  async function getOneTask() {
    try {
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
    } catch (err) {
      console.log(err)
    }
  }

  
  const sendMessage = async (customText) => {
    const text = customText || input
    if (!text || !task) return

    const token = localStorage.getItem('token')

    const newMessages = [
      ...messages,
      { role: 'user', content: text }
    ]

    setMessages(newMessages)
    setInput('')
    setLoadingAI(true)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ai/chat`,
        {
          messages: newMessages,
          task: {
            title: task.title,
            description: task.description
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setMessages([...newMessages, res.data])

    } catch (err) {
      console.log(err)
    }

    setLoadingAI(false)
  }

  
  async function deleteTask() {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      navigate('/tasks')
    } catch (err) {
      console.log(err)
    }
  }

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    getOneTask()
  }, [])

  return (
    <div>
      <h1>Task Details</h1>

      {task ? (
        <>
          
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.start}</p>
          <p>{task.end}</p>
          <p>{task.status}</p>
          <p>{task.routine}</p>
          <p>{task.priority}</p>

          {user?._id === task?.username?._id && (
            <>
              <button onClick={deleteTask}>Delete</button>
              <Link to={`/tasks/edit/${id}`}>Edit</Link>
            </>
          )}

          
          <hr />
          <h2>🤖 AI Assistant</h2>

          
          <button onClick={() => sendMessage("turn this task into simple steps")}>
            ✨ Generate Steps
          </button>

          
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              height: '250px',
              overflowY: 'auto',
              marginTop: '10px'
            }}
          >
            {messages.length === 0 && <p>Start chatting with AI...</p>}

            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <b>{msg.role === 'user' ? 'You' : 'AI'}:</b> {msg.content}
              </div>
            ))}

            {loadingAI && <p>AI is typing...</p>}

            <div ref={messagesEndRef} />
          </div>

          
          <div style={{ marginTop: '10px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />

            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default TaskDetails