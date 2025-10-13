import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  axios.defaults.withCredentials = true;

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  
  const getAuthState = async ()=>{

    try{

        const {data} = await axios.get(backend_url + '/api/auth/is-auth')

        if(data.success)
        {
            setIsLoggedIn(true)
            getUserData();
        }
    }
    catch(error){
        toast.error(error.message)
    }
  }


  const getUserData = async () => {
    try {
      const { data } = await axios.get(backend_url + "/api/user/data");

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } 
    catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  };

  useEffect(()=>{
    getAuthState()
  },[])


  const value = {
    backend_url,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;