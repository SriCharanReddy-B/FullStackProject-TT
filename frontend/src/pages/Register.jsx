import { useState } from 'react';
import '../App.css'
import axios from 'axios';

function Register() {
   const [text, setText] = useState({
      username: "",
      email: "",
      password: ""
   })
   function HandleChange(e) {
      setText({ ...text, [e.target.name]: e.target.value });
   }
   async function submitForm() {
      // FIXED: Removed < > brackets
      const res = await axios.post("http://localhost:8080/register", text)
      console.log(res.data)
      console.log(res.status)
      alert("User Registered Successfully")
   }
   return (
      <div className="Second-Component">
         <h1>User Registration</h1>
         <input type="text" name="username" placeholder='Enter Your UserName' onChange={HandleChange} />
         <input type="text" name="email" placeholder='Enter Your email' onChange={HandleChange} />
         <input type="password" name="password" placeholder='Enter Your password' onChange={HandleChange} />

         {/* Debugging values */}
         <h1>{text.username}</h1>
         <h1>{text.email}</h1>
         <h1>{text.password}</h1>

         <button onClick={submitForm}>Submit</button>
         <a href="/Login">Do You Have An Account</a>
      </div>
   )
}
export default Register;