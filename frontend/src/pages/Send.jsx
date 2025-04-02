import Input from "../component/Input"
import { useSearchParams } from "react-router-dom";
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast'
import {Loader} from 'lucide-react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Send = () => {
  const [searchParams]=useSearchParams();
  const id=searchParams.get("id");
  const name =searchParams.get("name");
  const [amount,setAmount]=useState();
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();


  async function sendMoney(){
    setLoading(true);
    try{
      const token=localStorage.getItem("token");
      const headers=token ? {Authorization:`Bearer ${token}`} : {};
      const res=await axiosInstance.post("account/transfer",{toAccountId:Number(id),amount:amount},{headers})
      toast.success("Transfer successfully");
      navigate("/dashboard");
    }catch(e){
      console.log(e.response.data.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
        <div className='w-96 bg-white border rounded-lg shadow-lg p-4 flex flex-col'>
          <div className='p-6'>
            <h2 className='text-3xl font-bold text-center'>Send Money</h2>
          </div>
          <div className='flex items-center space-x-4 pt-8'>
            <div className='size-12 rounded-full bg-green-500 flex justify-center items-center'>
              <span className='text-2xl text-white'>{name[0].toUpperCase()}</span>
            </div>
            <h3 className='text-2xl font-semibold'>{name}</h3>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <Input onChange={(e)=>setAmount(e.target.value)} label={"Amount (in Rs)"} type={'number'} placeholder={"Enter amount"} />
            </div>
            <button onClick={sendMoney} className='flex justify-center bg-green-500 w-full my-4 py-2 rounded-md text-white text-sm font-medium focus:ring-2 ring-green-500 ring-offset-2 ring-offset-background transition-colors'>
              {loading ? <Loader className='size-6 animate-spin' /> : "Initiate Transfer"}
            </button>
          </div>
        </div>
    </div>
  )
}

export default Send