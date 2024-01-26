import { useState } from 'react'
export default function TaskForm({onAdd}){
  const[taskName,setTaskName]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <button>+</button>
      <input type='text' placeholder='your next task...' value={taskName}
        onChange={(e)=>{
          setTaskName(e.target.value);
        }}/>
    </form>
  )
}