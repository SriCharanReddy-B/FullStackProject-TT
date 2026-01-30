import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');

    useEffect(() => {
        fetchSubjects();
        fetchCourses();
    }, []);

    const fetchSubjects = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/subjects');
            setSubjects(res.data);
        } catch (error) {
            console.error("Error fetching subjects", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/courses');
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    const handleAddSubject = async () => {
        if (!newSubjectName || !selectedCourseId) {
            alert("Subject Name and Course are required");
            return;
        }
        try {
            const course = courses.find(c => c.id === parseInt(selectedCourseId));
            await axios.post('http://localhost:8080/api/subjects', {
                name: newSubjectName,
                course: course
            });
            setNewSubjectName('');
            fetchSubjects();
        } catch (error) {
            console.error("Error adding subject", error);
        }
    };

    const handleDeleteSubject = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/subjects/${id}`);
            fetchSubjects();
        } catch (error) {
            console.error("Error deleting subject", error);
        }
    };

    return (
        <div>
            <h2>Manage Subjects</h2>
            <div>
                <input
                    type="text"
                    placeholder="Subject Name"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                />
                <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                    <option value="">Select Course</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
                <button onClick={handleAddSubject}>Add Subject</button>
            </div>
            <ul>
                {subjects.map(subject => (
                    <li key={subject.id}>
                        {subject.name} (Course: {subject.course?.name})
                        <button onClick={() => handleDeleteSubject(subject.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageSubjects;
