import React from 'react'
import {useState,useEffect}  from "react";
import axiosInstance from '../lib/axiosInstance';

const Balance = () => {
  const [balance,setBalance] =useState();

  async function getBalance(){
    try{
      const token=localStorage.getItem("token");
      const headers=token ? {Authorization:`Bearer ${token}`} : {};
      const res=await axiosInstance.get("/account/balance",{headers});
      setBalance(res.data.balance);
    }catch(e){
      console.log(e.response.data.message);
    }
  }

  useEffect(()=>{
    getBalance();
  },[])

  return (
    <div className='flex items-center space-x-4'>
        <div className='font-bold text-lg'>Your balance</div> 
        <div className='text-lg font-semibold'>Rs {balance}</div>
    </div>
  )
}

export default Balance