import { useState } from "react";
import axios from "axios";

function Login() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/users/login",
                loginData
            );

            console.log(response.data);

            alert(response.data.message);

        }
        catch (error) {

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Server error");

            }

        }

    };


    return (

        <div style={{ width: "400px", margin: "50px auto" }}>

            <h2>User Login</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email</label>
                    <br />

                    <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />

                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;