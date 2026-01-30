import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UserDetails() {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({ username: "", email: "", password: "" });
    const currentUserId = parseInt(localStorage.getItem("userId"));

    useEffect(() => {
        fetchAllUsers();
    }, []);

    async function fetchAllUsers() {
        try {
            const res = await axios.get("http://localhost:8080/allusers");
            setUsers(res.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleDelete(id) {
        if (window.confirm("Delete this user?")) {
            try {
                await axios.delete(`http://localhost:8080/delete/${id}`);
                if (id === currentUserId) {
                    alert("You deleted yourself. Logging out...");
                    localStorage.clear();
                    window.location.href = '/Login';
                } else {
                    fetchAllUsers();
                }
            } catch (error) {
                alert("Delete failed");
            }
        }
    }

    function handleEditClick(user) {
        setEditingId(user.id);
        setEditFormData({ username: user.username, email: user.email, password: user.password });
    }

    async function handleSave(id) {
        try {
            await axios.put(`http://localhost:8080/update/${id}`, editFormData);
            alert("Updated");
            setEditingId(null);
            fetchAllUsers();
        } catch (error) {
            alert("Update Failed");
        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center' }}>User Management Details</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ background: '#2c3e50', color: 'white' }}>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Username</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Password</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                                <td style={styles.td}>{user.id}</td>
                                {editingId === user.id ? (
                                    <>
                                        <td style={styles.td}><input value={editFormData.username} onChange={e => setEditFormData({ ...editFormData, username: e.target.value })} /></td>
                                        <td style={styles.td}><input value={editFormData.email} onChange={e => setEditFormData({ ...editFormData, email: e.target.value })} /></td>
                                        <td style={styles.td}><input value={editFormData.password} onChange={e => setEditFormData({ ...editFormData, password: e.target.value })} /></td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleSave(user.id)} style={styles.saveBtn}>Save</button>
                                            <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={styles.td}>{user.username}</td>
                                        <td style={styles.td}>{user.email}</td>
                                        <td style={styles.td}>{user.password}</td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleEditClick(user)} style={styles.editBtn}>Edit</button>
                                            <button onClick={() => handleDelete(user.id)} style={styles.deleteBtn}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    th: { padding: '12px', border: '1px solid #ddd' },
    td: { padding: '10px', border: '1px solid #eee' },
    editBtn: { background: '#f1c40f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' },
    deleteBtn: { background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
    saveBtn: { background: '#2ecc71', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' },
    cancelBtn: { background: '#95a5a6', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }
};

export default UserDetails;
