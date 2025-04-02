import React from 'react'
import Appbar from "../component/Appbar";
import Balance from "../component/Balance";
import Users from "../component/Users";

const Dashboard = ({authUser}) => {
  return (
    <div>
      <Appbar authUser={authUser} />
      <div className='m-8'>
        <Balance />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard