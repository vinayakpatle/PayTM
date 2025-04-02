import {useState,useEffect} from "react";
import Input from "./Input";
import User from "./User";
import axiosInstance from "../lib/axiosInstance";

const Users = () => {
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");
    const [isFetchingUsers,setIsFetchingUsers]=useState(false);

    async function fetchUsers(){
      setIsFetchingUsers(true);
      try{
        const token=localStorage.getItem("token");
        const headers=token ? {Authorization:`Bearer ${token}`} : {};
        const res=await axiosInstance.get(`/user/bulk?filter=${filter}`,{headers});
        setUsers(res.data.users);

      }catch(e){
        console.log(e.response.data.message);
      }finally{
        setIsFetchingUsers(false);
      }
    }

    useEffect(()=>{
      const delayDebounce=setTimeout(()=>{
        fetchUsers();
      },500)
      
      return ()=>clearTimeout(delayDebounce);
    },[filter])



  return (
    <div className='flex-col mt-6'>
        <h1 className="font-bold text-lg">Users</h1>
        <Input onChange={e=>setFilter(e.target.value)} type={"text"} placeholder={"Search users..."} />
        <div>
           {users.map((user,idx)=><User key={idx} user={user} />)}
        </div>
    </div>
  )
}

export default Users