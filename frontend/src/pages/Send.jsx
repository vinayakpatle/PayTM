import Heading from "../component/Heading"
import Input from "../component/Input"

const Send = () => {

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
        <div className='w-96 bg-white border rounded-lg shadow-lg p-4 flex flex-col'>
          <div className='p-6'>
            <h2 className='text-3xl font-bold text-center'>Send Money</h2>
          </div>
          <div className='flex items-center space-x-4 pt-8'>
            <div className='size-12 rounded-full bg-green-500 flex justify-center items-center'>
              <span className='text-2xl text-white'>A</span>
            </div>
            <h3 className='text-2xl font-semibold'>Friend's Name</h3>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <Input label={"Amount (in Rs)"} type={'number'} placeholder={"Enter amount"} />
            </div>
            <button className='flex justify-center bg-green-500 w-full my-4 py-2 rounded-md text-white text-sm font-medium focus:ring-2 ring-green-500 ring-offset-2 ring-offset-background transition-colors'>
              Initiate Transfer
            </button>
          </div>
        </div>
    </div>
  )
}

export default Send