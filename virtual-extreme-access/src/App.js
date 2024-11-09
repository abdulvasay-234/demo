// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Retrieve the user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          {user && role === 'student' && (
            <Route path="/dashboard" element={<StudentDashboard user={user} />} />
          )}
          {user && role === 'admin' && (
            <Route path="/dashboard" element={<AdminDashboard />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Home/>
      </div>
    </Router>
  );
}

export default App;
