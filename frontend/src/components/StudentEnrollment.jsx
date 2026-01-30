import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentEnrollment = () => {
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        fetchCourses();
        // Refresh component user data from localstorage in case it changed
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/courses');
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            const userId = localStorage.getItem('userId');
            const res = await axios.post(`http://localhost:8080/api/users/${userId}/enroll/${courseId}`);

            // Update local storage with new user data (including course)
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            alert("Enrolled Successfully!");
        } catch (error) {
            console.error("Error enrolling", error);
            alert("Enrollment Failed");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Student Enrollment</h2>

            {user && user.course ? (
                <div style={{ padding: '15px', background: '#dff0d8', borderRadius: '5px', marginBottom: '20px' }}>
                    <h3>You are enrolled in: {user.course.name}</h3>
                </div>
            ) : (
                <div style={{ padding: '15px', background: '#fcf8e3', borderRadius: '5px', marginBottom: '20px' }}>
                    <p>You are not enrolled in any course yet.</p>
                </div>
            )}

            <h3>Available Courses</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {courses.map(course => (
                    <li key={course.id} style={{
                        border: '1px solid #ddd',
                        padding: '15px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>{course.name}</span>
                        {/* Disable button if already enrolled in ANY course (simple logic for now) or strictly this course */}
                        {user && user.course && user.course.id === course.id ? (
                            <span style={{ color: 'green', fontWeight: 'bold' }}>Enrolled</span>
                        ) : (
                            <button
                                onClick={() => handleEnroll(course.id)}
                                disabled={user && user.course} // Disable if enrolled in a course already
                                style={{
                                    padding: '5px 15px',
                                    background: user && user.course ? '#ccc' : '#2c3e50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: user && user.course ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Enroll
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentEnrollment;
