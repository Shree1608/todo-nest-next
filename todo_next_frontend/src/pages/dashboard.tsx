import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const dashboard = () => {
    const [user , setUser] = useState(null);

    const [totalTasks, setTotalTasks] = useState(0);

    useEffect(() =>{
        updateTotalTasks();
    })

    
    const updateTotalTasks = async () => {
        try {
          const response = await fetch('http://localhost:5000/task/total',{
            method:'GET',
            headers:{
                'Content-Type' :'application/json',
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setTotalTasks(data);
            console.log(response);
          } else {
            console.error('Error occurred while fetching total tasks:', response);
            // Handle the error here, such as displaying an error message to the user
          }
        } catch (error) {
          console.error('error', error);
        }
      };


     const handleLogout = async () =>{
        try {
            const response = await fetch('http://localhost:5000/user/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            if (response.ok) {
              // Clear the token from localStorage
              alert('logout successfully')
              localStorage.removeItem('token');
              window.location.href='/login'
              // Redirect or perform any additional logout actions
            } else {
              console.error('Logout request failed');
            }
          } catch (error) {
            console.error('Error occurred while logging out', error);
          }
     } 
    

  return (
    <div className="flex-row lg:flex my-12">
    <div className="flex flex-col w-full p-3 bg-white shadow lg:h-screen lg:w-72">
        <div className="space-y-3">
            <div className="flex items-center">
                <h2 className="text-xl font-bold">Dashboard</h2>
            </div>
            
            <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="rounded-sm">
                        <Link
                            href='/dashboard'
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="rounded-sm">
                        <Link
                            href="/addtask"
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <span>Add Task</span>
                        </Link>
                    </li>
                  
                    <li className="rounded-sm">
                        <Link
                            href=''
                            className="flex items-center p-2 space-x-3 rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                            <button onClick={handleLogout}> Logout</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total tasks
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                {totalTasks}
                </div>
            </div>
        </div>
    </div>
</div>
);
  
}

export default dashboard
