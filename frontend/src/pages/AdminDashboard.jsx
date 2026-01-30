import React, { useState } from 'react';
import ManageCourses from '../components/ManageCourses';
import ManageSubjects from '../components/ManageSubjects';
import ManageStudents from '../components/ManageStudents';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('courses');

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="admin-nav">
                <button onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'active' : ''}>Manage Courses</button>
                <button onClick={() => setActiveTab('subjects')} className={activeTab === 'subjects' ? 'active' : ''}>Manage Subjects</button>
                <button onClick={() => setActiveTab('students')} className={activeTab === 'students' ? 'active' : ''}>Manage Students</button>
            </div>

            <div className="admin-content">
                {activeTab === 'courses' && <ManageCourses />}
                {activeTab === 'subjects' && <ManageSubjects />}
                {activeTab === 'students' && <ManageStudents />}
            </div>
        </div>
    );
};

export default AdminDashboard;
