import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from './pages/Dashboard';
import Send from "./pages/Send";
import ErrorPage from "./pages/ErrorPage";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import {useState,useEffect} from "react";
import axiosInstance from './lib/axiosInstance';
import {Loader} from 'lucide-react';
import UserProfile from "./component/Dropdown";


function App() {
  const [authUser,setAuthUser]=useState(null);
  const [loading,setLoading]=useState(false);
  
  const refresh=async()=>{
    setLoading(true);
    try{
      const token=localStorage.getItem("token");
      const headers=token ? {Authorization:`Bearer ${token}`} : {};
      const res=await axiosInstance.get("/user/me",{headers});
      setAuthUser(res.data.user);
    }catch(e){
      console.log(e.response.data.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    refresh();
  },[])

  if(loading && authUser){
    return <div className='h-screen flex justify-center items-center'>
        <Loader className='size-24 animate-spin' />
      </div>
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={!authUser ? <Signup setAuthUser={setAuthUser}/> : <Dashboard authUser={authUser} />} />;
            <Route path="/signup" element={!authUser ? <Signup setAuthUser={setAuthUser}/> : <Dashboard authUser={authUser} />} />;
            <Route path="/signin" element={!authUser ? <Signin setAuthUser={setAuthUser} /> : <Dashboard authUser={authUser} /> } />;
            <Route path="/dashboard" element={authUser ? <Dashboard authUser={authUser}/> : <Signin/>} />;
            <Route path="/send" element={authUser ? <Send /> : <Signin setAuthUser={setAuthUser} />} />;
            <Route path="*" element={<ErrorPage />} />;
            <Route path="/dropdown" element={<UserProfile />} />
        </Routes>
        <Toaster />
    </BrowserRouter>
  )
}

export default App
