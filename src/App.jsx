import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Homepage from './pages/Homepage';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AllTask from './pages/AllTask';
import CreateTask from './pages/CreateTask';
import TaskDetails from './pages/TaskDetails'
import TaskUpdate from './pages/TaskUpdate'
import CreateCategory from './pages/CreateCategory';
import AllCategories from './pages/AllCategories';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
        setUser(userInfo);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem('localReminders');
      if (!saved) return;

      let reminders = JSON.parse(saved);
      const now = new Date();
      const nowKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;

      reminders.forEach((r, index) => {
        const rDate = new Date(r.time);
        const rKey = `${rDate.getFullYear()}-${rDate.getMonth()}-${rDate.getDate()} ${rDate.getHours()}:${rDate.getMinutes()}`;

        if (nowKey === rKey) {
          alert(`🔔 REMINDER: ${r.msg}`);
          reminders.splice(index, 1);
          localStorage.setItem('localReminders', JSON.stringify(reminders));
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to='/dashboard'/>} />
        <Route path="/sign-in" element={!user ? <SignIn setUser={setUser} /> : <Navigate to='/dashboard'/>} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path='/tasks' element={<AllTask/>}/>
        <Route path='/tasks/:id' element={<TaskDetails user={user}/>}/>
        <Route path='/tasks/create' element={<CreateTask user={user}/>}/>
        <Route path='/tasks/edit/:id' element={<TaskUpdate user={user}/>}/> 
        <Route path="/categories" element={<AllCategories user={user} />} />
        <Route path="/categories/create" element={<CreateCategory user={user} />} />      
      </Routes>
    </div>
  );
}

export default App;