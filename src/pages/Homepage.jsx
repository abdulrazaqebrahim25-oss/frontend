function Homepage() {
  return (
    <div className="container">

      <h1 className="home-title">
        Organize Your Tasks. Stay Productive.
      </h1>

      <p className="home-subtitle">
        A simple and smart task management system designed to help you plan, organize, and complete your daily work efficiently.
      </p>

      <div className="home-grid">

        <div className="task-card home-card">
          <h2>Task Management</h2>
          <p>Create and organize your daily tasks easily</p>
        </div>

        <div className="task-card home-card">
          <h2>Categories</h2>
          <p>Group your tasks into organized categories</p>
        </div>

        <div className="task-card home-card">
          <h2>AI Assistant</h2>
          <p>Get smart help to break down tasks</p>
        </div>

        <div className="task-card home-card">
          <h2>Productivity</h2>
          <p>Track your progress and stay consistent</p>
        </div>

      </div>

      <p className="home-footer">
        Built using MERN Stack (MongoDB, Express, React, Node.js)
      </p>

    </div>
  )
}

export default Homepage