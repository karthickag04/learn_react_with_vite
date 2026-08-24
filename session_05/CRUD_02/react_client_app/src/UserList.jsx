import { useEffect, useState } from "react";
import axios from "axios";

import EditUser from "./EditUser";


function UserList() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

     const [editUserId, setEditUserId] = useState(null);


    // Get all users
    const getUsers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/users"
            );

            console.log(response.data);

            setUsers(response.data.users);

        }
        catch (error) {

            console.log(error);

            setError("Unable to fetch users");

        }
        finally {

            setLoading(false);

        }

    };



    // Delete user by ID
    const handleDelete = async (id) => {

        try {

            const response = await axios.delete(
                `http://localhost:5000/api/users/${id}`
            );

            console.log(response.data);

            // Remove deleted user from UI
            setUsers(users.filter((user) => user._id !== id));

        }
        catch (error) {

            console.log(error);

            alert("Unable to delete user");

        }
    }




 // Page load
    useEffect(() => {

        getUsers();

    }, []);


    if (loading) {

        return <h3>Loading users...</h3>;

    }


    if (error) {

        return <h3>{error}</h3>;

    }


    // Show EditUser component
    if (editUserId) {

        return (

            <EditUser
                userId={editUserId}

                onUpdate={() => {
                    setEditUserId(null);
                    getUsers();
                }}

                onCancel={() => {
                    setEditUserId(null);
                }}
            />

        );

    }










    return (

        <div style={{ width: "800px", margin: "50px auto" }}>

            <h2>Registered Users</h2>


            {users.length === 0 ? (

                <p>No users registered.</p>

            ) : (

                <table
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                    width="100%"
                >

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                        </tr>

                    </thead>


                    <tbody>

                        {users.map((user) => (

                            <tr key={user._id}>

                                <td>
                                    {user.name}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {user.role}
                                </td>
                                <td>
                                   <button
                                        onClick={() =>
                                            setEditUserId(user._id)
                                        }
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                   <button
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default UserList;