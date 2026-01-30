import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        navigate('/Login');
    }

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>Student Portal</div>
            <div style={styles.links}>
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                {/* Admin Link Check */}
                {JSON.parse(localStorage.getItem("user"))?.role === "ADMIN" && (
                    <Link to="/admin" style={styles.link}>Admin Panel</Link>
                )}
                <Link to="/users" style={styles.link}>User Details</Link>
                <Link to="/attendance" style={styles.link}>Attendance</Link>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#2c3e50',
        color: 'white',
        marginBottom: '20px'
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    links: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem'
    },
    logoutBtn: {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Navbar;
