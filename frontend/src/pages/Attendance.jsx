import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Attendance() {
    const [input, setInput] = useState({ total: '', absent: '' });
    const [records, setRecords] = useState([]);
    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        fetchAttendance();
    }, []);

    async function fetchAttendance() {
        if (!currentUserId) return;
        try {
            const res = await axios.get(`http://localhost:8080/attendance/user/${currentUserId}`);
            // Sort by ID descending to show newest first
            const sorted = res.data.sort((a, b) => b.id - a.id);
            setRecords(sorted);
        } catch (e) {
            console.error("Error fetching attendance", e);
        }
    }

    function handleChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    async function addRecord() {
        const total = parseInt(input.total);
        const absent = parseInt(input.absent);

        if (isNaN(total) || isNaN(absent) || total <= 0 || absent < 0 || absent > total) {
            alert("Invalid Input");
            return;
        }

        try {
            await axios.post(`http://localhost:8080/attendance/add/${currentUserId}`, {
                total,
                absent
            });
            fetchAttendance(); // Refresh list
            setInput({ total: '', absent: '' });
        } catch (e) {
            alert("Failed to save record");
            console.error(e);
        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2>Attendance Tracker</h2>

                {/* Inline Inputs */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', alignItems: 'center' }}>
                    <input
                        type="number"
                        name="total"
                        placeholder="Total Classes"
                        value={input.total}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        type="number"
                        name="absent"
                        placeholder="Absent Classes"
                        value={input.absent}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <button onClick={addRecord} style={styles.btn}>Add Status</button>
                </div>

                {/* Table */}
                {records.length > 0 && (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: '#34495e', color: 'white' }}>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Total</th>
                                <th style={styles.th}>Absent</th>
                                <th style={styles.th}>Present</th>
                                <th style={styles.th}>%</th>
                                <th style={styles.th}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((r) => (
                                <tr key={r.id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={styles.td}>{r.date}</td>
                                    <td style={styles.td}>{r.totalClasses}</td>
                                    <td style={{ ...styles.td, color: '#e74c3c' }}>{r.absentClasses}</td>
                                    <td style={{ ...styles.td, color: '#2ecc71' }}>{r.presentClasses}</td>
                                    <td style={styles.td}>{r.percentage}%</td>
                                    <td style={{ ...styles.td, fontWeight: 'bold', color: r.eligible ? '#2ecc71' : '#e74c3c' }}>
                                        {r.eligible ? "Eligible" : "Not Eligible"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {records.length === 0 && <p style={{ color: '#888' }}>No records found.</p>}
            </div>
        </div>
    );
}

const styles = {
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '150px' },
    btn: { padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    th: { padding: '12px', border: '1px solid #ddd' },
    td: { padding: '10px', border: '1px solid #eee' }
};

export default Attendance;
