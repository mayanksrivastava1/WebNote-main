import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import NoteState from './Context/Note/NoteState';
import Login from './Components/Login';
import Notes from './Components/Notes';
import Signup from './Components/Signup';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem('token');
    setIsLoggedIn(!!user);
  }, []);
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <ToastContainer position="bottom-left" autoClose={1500} hideProgressBar={true} closeOnClick
          rtl={false} draggable pauseOnHover theme="light" />
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <Notes /> : <Navigate to="/login" replace />}
          />
          <Route
            exact
            path="/addNote"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            exact
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            exact
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Signup setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
