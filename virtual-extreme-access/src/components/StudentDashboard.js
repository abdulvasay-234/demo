// src/components/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function StudentDashboard({ user }) {
  const [studentData, setStudentData] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStudentData(data);
        setStatus(data.status);
      }
    };
    fetchStudentData();
  }, [user]);

  const sendRequest = () => {
    window.location.href = 'mailto:faculty@lords.ac.in?subject=Hall Ticket Request&body=Please approve my hall ticket request.';
  };

  const downloadHallTicket = () => {
    // Implement the download logic here
    alert('Downloading hall ticket...');
  };

  if (!studentData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Name: {studentData.name}</p>
      <p>Roll Number: {studentData.rollNumber}</p>
      <p>Hall Ticket Status: {status}</p>
      {status === 'pending' && <button onClick={sendRequest}>Send Request</button>}
      {status === 'approved' && <button onClick={downloadHallTicket}>Download Hall Ticket</button>}
      {status === 'rejected' && <p>Your hall ticket request has been rejected.</p>}
    </div>
  );
}

export default StudentDashboard;
