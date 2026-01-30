import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StudentEnrollment from '../components/StudentEnrollment';

function Dashboard() {
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);
    }, []);

    return (
        <div>
            <Navbar />
            <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', color: '#2c3e50' }}>Welcome, {userName}!</h1>
                <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>
                    Manage your academic journey here.
                </p>

                {/* Student Enrollment Section */}
                <StudentEnrollment />
            </div>
        </div>
    );
}

export default Dashboard;
