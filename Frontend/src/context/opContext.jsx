import axios from 'axios';
import React, { useContext, createContext, useEffect, useState } from 'react';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.warn("No token found. User data cannot be fetched.");
        setLoading(false);
        return; 
      }

      try {
        const response = await axios.get("/api/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data fetched:", response.data);

        const users = response.data;
        if (users.length > 0) {
          const Newdata = users[0]; 
          setUser({
            email: Newdata.email,
            name: Newdata.name,
          });
          console.log("Fetched user data:", Newdata);
        } else {
          console.warn("No users found in response.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Optional: Log when user state changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };

