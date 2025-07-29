import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { api } from '../../api'

const Users = () => {
    const [userReload, setUserReload] = useState(false)
  const {data}  = useFetch("/users",{},userReload)

  const handelSubmit = (evt) =>{
    evt.preventDefault()
    const formData = new FormData(evt.target)
    const data = Object.fromEntries(formData)
    api
    .post("/users",data)
    .then(res => {
        setUserReload(p => !p)
        evt.target.reset()
    })
    .catch(res => {})

    

    
  }

  const handleDelete = (id) => {
   api
   .delete(`/users/${id}`)
   .then(res => {
    setUserReload(p =>  !p)
   })
    
  }
  return (
    <>
    <div className='flex justify-center mt-[20px]'>
        <form onSubmit={handelSubmit}  action="" className='w-[600px] flex   items-center justify-center  flex-wrap gap-5'>
            <input className='outline-none border-1 border-slate-300 rounded-md w-[100%] shadow-md py-2 p-2' name='fname' type="text" placeholder='fname' required />
            <input className='outline-none border-1 border-slate-300 rounded-md w-[100%] shadow-md py-2 p-2' name='lname' type="text" placeholder='lname' required />
            <input className='outline-none border-1 border-slate-300 rounded-md w-[100%] shadow-md py-2 p-2' name='phone' type="tel" placeholder='phone' required />
            <input className='outline-none border-1 border-slate-300 rounded-md w-[100%] shadow-md py-2 p-2' name='address' type="text" placeholder='address' required /> 
            <input className='outline-none border-1 border-slate-300 rounded-md w-[100%] shadow-md py-2 p-2' name='gender' type="text" placeholder='gender' required /> 
            <input className='outline-none border-1 border-slate-300 rounded-md w-[100%] shadow-md py-2 p-2' name='birthdate' type="date" placeholder='birthdate' required /> 
            <button className='border-1 bg-blue-500 text-[white] p-2 rounded-md' >submit</button>
        </form>
    </div>

    <div className='p-[20px] flex items-center gap-[15px]'> 
 
        {
            data?.map(item => (
                <div key={item.id}>
                    <div className='w-[150px] p-1 shadow-2xl bg-slate-300 rounded-md'>
                    <h2>{item.fname}</h2>
                    <h3>{item.lname}</h3>
                    <p>{item.phone}</p>
                    <p>{item.address}</p>
                    <p>{item.gender}</p>
                    <p>{item.birthdate}</p>
                    <button className='border-1 bg-red-500 rounded-md p-1 shadow-md text-white' onClick={() =>handleDelete(item.id)}>Delete</button>
                    </div>
                </div>
            ))
        }
    </div>
    
    </>
  )
}

export default Users