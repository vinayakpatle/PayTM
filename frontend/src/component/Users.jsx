import {useState} from "react";
import Input from "./Input"
import Button from "./Button";
import User from "./User";

const Users = () => {
    const [users,setUsers]=useState([{
        id:1,
        firstName:"Vinayak",
        lastName:"patle"
    },
    {
        id:2,
        firstName:"Harkirat",
        lastName:"singh"
    }
    ])

  return (
    <div className='flex-col mt-6'>
        <h1 className="font-bold text-lg">Users</h1>
        <Input type={"text"} placeholder={"Search users..."} />
        <div>
           {users.map(user=><User user={user} />)}
        </div>
    </div>
  )
}

export default Users