import {useState} from "react";
import Heading from "../component/Heading";
import SubHeading from "../component/SubHeading";
import Input from '../component/Input';
import Button from "../component/Button";
import BottomWarning from "../component/BottomWarning";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

const Signup = () => {
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    try{
      const res=await axiosInstance.post("/user/signup",{
        firstName,
        lastName,
        username,
        password
      })
      const token=res.data.token;
      localStorage.setItem("token",token);
      navigate("/dashboard");
    }catch(e){
      console.log(e.response.data.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-slate-300">
        <div className="flex flex-col items-center">
            <div className='w-80 bg-white rounded-lg p-2 px-4 text-center'>
                <Heading label={'Sign Up'}/>
                <SubHeading label={"Enter your information to create an account"} />
                <Input onChange={e=>setFirstName(e.target.value)} label={"First Name"} type={"text"} placeholder={"vinayak"} />
                <Input onChange={e=>setLastName(e.target.value)} label={"Last Name"} type={"text"} placeholder={"patle"} />
                <Input onChange={e=>setUsername(e.target.value)} label={"Email"} type={"email"} placeholder={"vinayak@gmail.com"} />
                <Input onChange={e=>setPassword(e.target.value)} label={"Password"} type={"password"} placeholder={"••••••••"} />
                <Button loading={loading} label={"Sign up"} onClick={handleSubmit} />
                <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
  )
}

export default Signup