import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import config from "../../config.js";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(`${config.backUrl}/users`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.lenth ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </article>
  );
};

export default Users;
