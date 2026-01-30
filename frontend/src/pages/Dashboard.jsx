import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

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
                    Select an option from the navigation bar to get started.
                </p>
            </div>
        </div>
    );
}

export default Dashboard;
