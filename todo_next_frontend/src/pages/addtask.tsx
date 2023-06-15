'use client'
import React, { useEffect, useState } from 'react'
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react'
import { FaExclamationCircle } from 'react-icons/fa';

import Link from 'next/link'

interface Task {
    id?: number
    title :string;
    description:string;
    deadline :string
}
const addtask = () => {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
    const [task ,setTask] = useState({title :"" , description:"" , deadline:""})
    const [tasks , setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [confirmedDelete , setConfirmDelete] = useState(false);



useEffect(()=>{
    fetchTasks();
} ,[])
const fetchTasks = async()=>{
    try {
        const response = await fetch('http://localhost:5000/task',{
          headers :{
            'Content-Type' :'application/json',
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.ok){
            const data = await response.json();
            setTasks(data)
        }
    } catch (error) {
        console.error('error fetching task' , error)
    }
}    




const taskAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const url = selectedTask ? `http://localhost:5000/task/${selectedTask.id}` : 'http://localhost:5000/task/add';
  const method = selectedTask ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(task),
  });

  if (response.ok) {
    const content = await response.json();

    if (selectedTask) {
      // Update the task in the tasks array
      setTasks(prevTasks =>
        prevTasks.map(prevTask => (prevTask.id === selectedTask.id ? content : prevTask))
      );
      setSelectedTask(null); // Clear the selected task
    } else {
      // Add the new task to the tasks array
      setTasks(prevTasks => [...prevTasks, content]);
    }

    setTask({ title: '', description: '', deadline: '' });
    alert('Task added successfully');
    console.log(content);

    
  }
};

  



const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target as HTMLInputElement;
  setTask((prevTask) => ({
    ...prevTask,
    [name]: value,
  }));
};


  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    props.setOpenModal('form-elements');
  };
  
  const handleDeleteTask = async (taskId: number | undefined) => {
    if( taskId === undefined) {
      return;
    }
   
    const url = `http://localhost:5000/task/${taskId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (response.ok) {
      setTasks(prevTasks => prevTasks.filter(prevTask => prevTask.id !== taskId));
      
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

          // Redirect or perform any additional logout actions
        } else {
          console.error('Logout request failed');
         
          
        }
      } catch (error) {
        console.error('Error occurred while logging out', error);
      }
 } 
  

  return (
    <div className="flex-row lg:flex my-12 ">
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
                            href="/"
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
                            <button onClick={handleLogout}>Logout</button>
                            
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
   
    </div>
<div className='m-[5vw]'>
    <div className='mb-5'>
        
    <Button className='bg-blue-800 hover:bg-blue-900' onClick={() => props.setOpenModal('form-elements')}>Add Task</Button>
      <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => {
        props.setOpenModal(undefined)  
    }}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Task</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title of task" />
              </div>
              <TextInput id="title" type='text' name='title' value={task.title} onChange={handleChange} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description of task"   />
              </div>
              <TextInput id="description" type="text" required name='description' value={task.description} onChange={handleChange}/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dedline" value="Time takking to complete task" />
              </div>
              <TextInput id="dedline"  type='text' name='deadline'value={task.deadline} onChange={handleChange} />
            </div>
            <div className="w-full">
            <Button onClick={taskAdd}>Task added</Button>
              
            </div>
            
          </div>
          
        </Modal.Body>
      </Modal>
      
    </div>

<Table hoverable  >
      <Table.Head>
      <Table.HeadCell>
          index
        </Table.HeadCell>
        <Table.HeadCell>
          title 
        </Table.HeadCell>
        <Table.HeadCell>
          description
        </Table.HeadCell>
        <Table.HeadCell>
          deadline
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Edit
          </span>
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Delete
          </span>
        </Table.HeadCell>
      </Table.Head>
      
      <Table.Body className="divide-y">
        {tasks.map((task , index)=>(
            <Table.Row  key={task.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
           <Table.Cell>
            {index+1}
          </Table.Cell>
          <Table.Cell>
            {task.title}
          </Table.Cell>
          <Table.Cell>
            {task.description}
          </Table.Cell>
          <Table.Cell>
            {task.deadline}
          </Table.Cell>
          <Table.Cell>
        <Button onClick={() => handleEditTask(task)}>Edit</Button>
          </Table.Cell>
          <Table.Cell>
        <Button color="failure" onClick={() => props.setOpenModal('pop-up')}>Delete</Button>
        <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FaExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {props.setOpenModal(undefined) , setConfirmDelete(true)  ,handleDeleteTask(task.id);}}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => {props.setOpenModal(undefined);setConfirmDelete(false)}}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
          </Table.Cell>
        </Table.Row>
        
        ))}
        
      </Table.Body>
    </Table>


      </div> 
</div>
    

  )
}

export default addtask
