import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourseName, setNewCourseName] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/courses');
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    const handleAddCourse = async () => {
        if (!newCourseName) return;
        try {
            await axios.post('http://localhost:8080/api/courses', { name: newCourseName });
            setNewCourseName('');
            fetchCourses();
        } catch (error) {
            console.error("Error adding course", error);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/courses/${id}`);
            fetchCourses();
        } catch (error) {
            console.error("Error deleting course", error);
        }
    };

    return (
        <div>
            <h2>Manage Courses</h2>
            <div>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                />
                <button onClick={handleAddCourse}>Add Course</button>
            </div>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.name}
                        <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageCourses;
