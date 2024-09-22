import axios from 'axios';
import React, { useContext, createContext, useEffect, useState } from 'react';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.warn("No token found. User data cannot be fetched.");
        return; 
      }

      try {
        const response = await axios.get("http://localhost:3000/ai/home", {
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
          
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Optional: Log when user state changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };
