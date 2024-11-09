import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import customFont from '../assets/Poppins-Medium.ttf'; 
import samplePdf from '../assets/cert.pdf';

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

  const downloadHallTicket = async () => {
    try {
      const pdfBytes = await fetch(samplePdf).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(pdfBytes);
  
      // Register fontkit
      pdfDoc.registerFontkit(fontkit);
  
      // Load custom font
      const fontBytes = await fetch(customFont).then((res) => res.arrayBuffer());
      const font = await pdfDoc.embedFont(fontBytes);
  
      const page = pdfDoc.getPage(0);
      page.drawText(studentData.name, {
        x: 85,
        y: 395,
        size: 18,
        font: font,
        color: rgb(0, 0, 0),
      });
      page.drawText(studentData.rollNumber, {
        x: 95,
        y: 370,
        size: 18,
        font: font,
        color: rgb(0, 0, 0),
      });
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `${studentData.name}_HallTicket.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading hall ticket:', error);
      alert('Failed to download hall ticket. Please try again.');
    }
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
