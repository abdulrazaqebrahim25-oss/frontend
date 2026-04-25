import { Link, useNavigate } from 'react-router'

function Navbar({ user, setUser }) {
  const navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('token')
    setUser(null)
    navigate("/")
  }

  return (
    <nav>
      <Link className='nav-item' style={{fontWeight: 'bold', color: 'var(--primary)'}} to='/'>TaskApp</Link>

      <div className="nav-links">
        <Link className='nav-item' to='/'>Home</Link>
        {user ? (
          <>
            <Link className='nav-item' to='/dashboard'>Dashboard</Link>
            <Link className='nav-item' to='/tasks'>Tasks</Link>
            <Link className='nav-item' to='/tasks/create'>New Task</Link>
            <Link className='nav-item' to='/categories'>Categories</Link>
            <span className='user-badge'>{user.username}</span>
            <button className='logout-btn' onClick={logOut}>Log Out</button>
          </>
        ) : (
          <>
            <Link className='nav-item' to='/sign-up'>Sign Up</Link>
            <Link className='nav-item' to='/sign-in'>Sign In</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar