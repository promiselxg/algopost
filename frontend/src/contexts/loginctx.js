import React,{useState} from 'react';

export const LoggedinCtx = {
    setLoggedinState:(a)=>{},
    loggedin:false,
    logout:()=>{}
}
export const LoggedinContext = React.createContext(LoggedinCtx);
export const LoginContextProvider = ({children})=>{
    const authToken = sessionStorage.getItem("logintoken") || localStorage.getItem("logintoken");
    const [loggedinState,setLoggedin] = useState(authToken);
    const updateloggedin = (a)=>{
        setLoggedin(a)
    }
   const logoutState = () =>{
       sessionStorage.removeItem("logintoken")
       localStorage.removeItem("logintoken")
        setLoggedin(false)
    }
    return <LoggedinContext.Provider value={{
        setLoggedinState:updateloggedin,
        loggedin:loggedinState,
        logout:logoutState
    }}>
        {children}
    </LoggedinContext.Provider>
}