import { useState } from "react";
import axios from "axios";

function Register({ onRegisterSuccess }){

const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    role:"Student"
});

const handleChange = (e)=>{
    setUser({
        ...user,
        [e.target.name]:e.target.value
    });
};

const handleSubmit = async(e)=>{
    e.preventDefault();

    try{

        const res = await axios.post(
            "http://localhost:5000/api/users/register",
            user
        );

        alert(res.data.message);
        if (onRegisterSuccess) {
            onRegisterSuccess();
        }

    }
    catch(error){
        alert("Error registering user");
    }
};

return(

<div style={{width:"400px",margin:"auto"}}>

<h2>User Registration</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Name"
onChange={handleChange}
/>

<br/><br/>

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
/>

<br/><br/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
/>

<br/><br/>

<select name="role" onChange={handleChange}>

<option value="Student">Student</option>
<option value="Teacher">Teacher</option>
<option value="Admin">Admin</option>

</select>

<br/><br/>

<button type="submit">
Register
</button>

</form>

</div>

);

}

export default Register;