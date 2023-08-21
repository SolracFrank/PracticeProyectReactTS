import React, { ReactNode, createContext, useState } from "react";

// Define el tipo para el contexto
interface UserContextType {
    user: boolean;
    setUser: React.Dispatch<React.SetStateAction<boolean>>;
  }  

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode; // Uso de ReactNode para la prop children
}

const UserProvider: React.FC<UserProviderProps>  = ({ children }) => {
    const [user,setUser] = useState(true);
    
    return  (
    <UserContext.Provider value={{user,setUser}}>
       {children}
    </UserContext.Provider>
    );
}

export default UserProvider;
