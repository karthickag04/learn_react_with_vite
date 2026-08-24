import { useEffect, useState } from "react";
import axios from "axios";

function EditUser({ userId, onUpdate, onCancel }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // Get selected user
    const getUser = async () => {

        try {

            const response = await axios.get(
                `http://localhost:5000/api/users`
            );

            const users = response.data.users;

            const user = users.find(
                (user) => user._id === userId
            );

            if (!user) {
                setError("User not found");
                return;
            }

            setFormData({
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            });

        }
        catch (error) {

            console.log(error);

            setError("Unable to fetch user");

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        getUser();

    }, [userId]);


    // Handle input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // Update user
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.put(
                `http://localhost:5000/api/users/${userId}`,
                formData
            );

            console.log(response.data);

            alert("User updated successfully");

            onUpdate();

        }
        catch (error) {

            console.log(error);

            setError("Unable to update user");

        }

    };


    if (loading) {
        return <h3>Loading user...</h3>;
    }


    return (

        <div style={{ width: "500px", margin: "50px auto" }}>

            <h2>Edit User</h2>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}


            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name</label>

                    <br />

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>


                <br />


                <div>
                    <label>Email</label>

                    <br />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>


                <br />


                <div>
                    <label>Password</label>

                    <br />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>


                <br />


                <div>
                    <label>Role</label>

                    <br />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >

                        <option value="user">
                            User
                        </option>

                        <option value="admin">
                            Admin
                        </option>

                    </select>

                </div>


                <br />


                <button type="submit">
                    Update User
                </button>


                <button
                    type="button"
                    onClick={onCancel}
                    style={{ marginLeft: "10px" }}
                >
                    Cancel
                </button>

            </form>

        </div>

    );

}

export default EditUser;