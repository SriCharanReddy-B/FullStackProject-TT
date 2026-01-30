import { useState } from 'react';
import '../App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
   const [text, setText] = useState({
      username: "",
      email: "",
      password: "",
      role: "USER" // Default
   })
   function HandleChange(e) {
      setText({ ...text, [e.target.name]: e.target.value });
   }
   function handleRoleChange(role) {
      setText({ ...text, role: role });
   }

   async function submitForm() {
      // FIXED: Removed < > brackets
      try {
         const res = await axios.post("http://localhost:8080/register", text)
         console.log(res.data)
         alert("User Registered Successfully")
      } catch (e) {
         console.error(e)
         alert("Registration Failed")
      }
   }
   return (
      <div className="Second-Component">
         <h1>User Registration</h1>
         <input type="text" name="username" placeholder='Enter Your UserName' onChange={HandleChange} />
         <input type="text" name="email" placeholder='Enter Your email' onChange={HandleChange} />
         <input type="password" name="password" placeholder='Enter Your password' onChange={HandleChange} />

         {/* Role Selection */}
         <div style={{ margin: '15px 0' }}>
            <label style={{ marginRight: '15px' }}>
               <input
                  type="checkbox"
                  checked={text.role === 'USER'}
                  onChange={() => handleRoleChange('USER')}
               /> Student/User
            </label>
            <label>
               <input
                  type="checkbox"
                  checked={text.role === 'ADMIN'}
                  onChange={() => handleRoleChange('ADMIN')}
               /> Admin
            </label>
         </div>

         {/* Debugging values */}
         {/* <h1>{text.username}</h1>
         <h1>{text.email}</h1>
         <h1>{text.password}</h1> */}

         <button onClick={submitForm}>Submit</button>
         <Link to="/Login">Do You Have An Account</Link>
      </div>
   )
}
export default Register;