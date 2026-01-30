import axios from 'axios';
import { useState } from 'react';
import '../App.css'
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    function handleChange(e) {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
    }

    async function submitForm() {
        try {
            const res = await axios.post("http://localhost:8080/login", loginUser)

            // --- NEW CODE: Save User Info ---
            // The backend returns the full user object (id, username, email, etc.)
            // We save the ID and Username to use in the Dashboard
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("userName", res.data.username);

            alert("User login Success")
            navigate("/dashboard")
        } catch (err) {
            alert("Login Failed, Please Check Your Details")
        }
    }
    return (
        <div className='auth-container'>
            <h1>Login Here</h1>
            <input type="text" name="email" placeholder='Enter User Email' onChange={handleChange} />
            <br /><br />
            <input type="password" name="password" placeholder='Enter User Password' onChange={handleChange} />
            <button onClick={submitForm}>Submit</button>

            <Link to="/Register">Don't Have An Account?</Link>
        </div>
    )
}
export default Login;