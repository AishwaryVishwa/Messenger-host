

const { createContext, useState } = require("react");

export const userContext=createContext();

const UserProvider=({children})=>{
     
     const [userData, setuserData] = useState();
     
    return (
        <userContext.Provider value={{userData,setuserData}}>
         {children}
        </userContext.Provider>
    )
}

export default UserProvider