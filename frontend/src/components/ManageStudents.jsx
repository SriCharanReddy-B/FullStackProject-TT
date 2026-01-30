import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:8080/allusers');
            // Filter only users with role USER
            const studentUsers = res.data.filter(u => u.role === 'USER');
            setStudents(studentUsers);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:8080/delete/${id}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student", error);
        }
    };

    return (
        <div>
            <h2>Enrolled Students</h2>
            {students.length === 0 ? <p>No students found.</p> : (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ background: '#f2f2f2', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>Name</th>
                            <th style={{ padding: '10px' }}>Email</th>
                            <th style={{ padding: '10px' }}>Enrolled Course</th>
                            <th style={{ padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td style={{ padding: '10px' }}>{student.username}</td>
                                <td style={{ padding: '10px' }}>{student.email}</td>
                                <td style={{ padding: '10px' }}>
                                    {student.course ? (
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>{student.course.name}</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>Not Enrolled</span>
                                    )}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <button
                                        onClick={() => handleDeleteStudent(student.id)}
                                        style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageStudents;
