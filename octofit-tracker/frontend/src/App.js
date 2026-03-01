import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell py-4">
      <div className="container">
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h1 className="display-6 fw-bold mb-1">OctoFit Tracker</h1>
            <p className="text-muted mb-0">Fitness leaderboard and activity dashboard</p>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg bg-white shadow-sm rounded px-3 mb-4">
          <ul className="navbar-nav gap-2 flex-wrap">
          <li className="nav-item">
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/teams">
              Teams
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/activities">
              Activities
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/workouts">
              Workouts
            </NavLink>
          </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
