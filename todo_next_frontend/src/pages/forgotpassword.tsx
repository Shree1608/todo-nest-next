import { useRouter } from 'next/router'
import React, { useState } from 'react'




const forgotpassword = () => {
 const router = useRouter()
  const [newpassword , setNewpass] = useState({email :"" ,password :""})

  const newPassData = async (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/user/forgotpassword' , {
        method :'POST' , 
        headers :{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newpassword)
      });
      if(response.ok){
        alert('password chagned successfully')
        // window.location.href ='/login'
        router.push('login')
      }else if(response.status === 404){
        alert('email not found')
      }
      else{
        throw Error("enter again it's fail")
       }
    } catch (error) {
      console.log(error);
      
      
    }
  }

  const handleChange = async(e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target  ;
    setNewpass((prepassword) => ({
      ...prepassword ,
      [name] :value,
    }));
  }
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Icons8_flat_todo_list.svg/1024px-Icons8_flat_todo_list.svg.png"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
       Create new password
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              New Password
            </label>
            
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
       


        <div>
          <button onClick={newPassData}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           Password Change
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Home page
        </a>
      </p>
    </div>
  </div>
    </div>
  )
}

export default forgotpassword
