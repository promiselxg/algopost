import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import {
  Home,
  NotFound,
  Dashboard,
  Submit,
  Login,
  Signup,
  Tokens,
  Watchlist,
} from './pages';
import PrivateRouter from './PrivateRouter';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/submit"
            element={
              <PrivateRouter>
                <Submit />
              </PrivateRouter>
            }
            exact
          />
          <Route
            path="/profile"
            element={
              <PrivateRouter>
                <Dashboard />
              </PrivateRouter>
            }
            exact
          />
          <Route
            path="/watchlist"
            element={
              <PrivateRouter>
                <Watchlist />
              </PrivateRouter>
            }
            exact
          />
          <Route path="*" element={NotFound} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
