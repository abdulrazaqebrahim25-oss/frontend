import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router'
import '../App.css'

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

      setMessages([
        ...newMessages,res.data
      ])

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
    <div className="container">
         <Link to="/tasks" className="nav-item">
        ← Back to All Tasks
      </Link>
      <h1>Task Details</h1>

      {task ? (
        <>
          <div className="task-card">

            <span className={`priority-tag ${task.priority}`}>
              {task.priority}
            </span>

            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p><b>Start:</b> {task.start}</p>
            <p><b>End:</b> {task.end}</p>
            <p><b>Status:</b> {task.status}</p>
            <p><b>Routine:</b> {task.routine}</p>

            {user?._id === task?.username?._id && (
              <div className="action-row">
                <button className="logout-btn" onClick={deleteTask}>
                  Delete
                </button>

                <Link className="nav-item" to={`/tasks/edit/${id}`}>
                  Edit
                </Link>
              </div>
            )}
          </div>

          <hr style={{ margin: '40px 0', opacity: '0.1' }} />

          <div className="chat-box ai-section">

            <h2 className="ai-header">🤖 AI Assistant</h2>

            <button
              className="ai-action-btn"
              onClick={() => sendMessage("turn this task into simple steps")}
            >
              ✨ Generate Steps
            </button>

            <div className="messages-list">
              {messages.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  Start chatting with AI...
                </p>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`bubble ${msg.role === 'user' ? 'user' : 'ai'}`}
                >
                  <b>{msg.role === 'user' ? 'You' : 'AI'}:</b> {msg.content}
                </div>
              ))}

              {loadingAI && (
                <p className="bubble ai">AI is typing...</p>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="ai-input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI..."
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />

              <button onClick={() => sendMessage()}>
                Send
              </button>
            </div>

          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default TaskDetails