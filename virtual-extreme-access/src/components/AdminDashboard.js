// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function AdminDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const studentList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role === 'student');
      setStudents(studentList);
    };
    fetchStudents();
  }, []);

  const handleApprove = async (studentId) => {
    const studentDoc = doc(db, 'users', studentId);
    await updateDoc(studentDoc, { status: 'approved' });
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, status: 'approved' } : student
      )
    );
  };

  const handleReject = async (studentId) => {
    const studentDoc = doc(db, 'users', studentId);
    await updateDoc(studentDoc, { status: 'rejected' });
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, status: 'rejected' } : student
      )
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>List of Students</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.status}</td>
              <td>
                <button onClick={() => handleApprove(student.id)}>Approve</button>
                <button onClick={() => handleReject(student.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
