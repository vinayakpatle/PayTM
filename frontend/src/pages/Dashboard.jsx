import React from 'react'
import Appbar from "../component/Appbar";
import Balance from "../component/Balance";
import Users from "../component/Users";

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className='m-8'>
        <Balance balance={"10,000"} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard