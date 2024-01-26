import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (tasks.length === 0) {
      localStorage.removeItem("tasks");
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const t = localStorage.getItem("tasks");
    setTasks(JSON.parse(t));
  }, []);
  function addTask(name) {
    setTasks((prev) => {
      return [...prev, {name: name, done: false }];
    });
  }
  function updateDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }
  const count =tasks.filter(task => { return task.done===true }).length
  function deleteTask(taskIndex){
    setTasks((prev) => {
      const newTasks=[...prev];
      if (taskIndex > -1) newTasks.splice(taskIndex,1);
      return newTasks;
    })
  }

  function updateTask(taskIndex, newName){
    setTasks((prev)=> {
      const newTasks=[...prev];
      newTasks[taskIndex].name=newName;
      return newTasks;
    })
  }
  function getMessage(){
    if(tasks.length === 0) return `add something!🙏`
    const completed = count/tasks.length * 100;
    if(completed === 0) return `try atleast one!🙏`
    if(completed === 100) return `well done today!🤝`
    return `keep going!💪`
  }
  return (
    <div className="app">
      <h1>{count}/{tasks.length} complete</h1>
      <h2>{getMessage()}</h2>
      <div className="taskform">
        <TaskForm
          onAdd={(name) => {
            addTask(name);
          }}
        />
      </div>
      <div className="tasks">
        {tasks.map((task, index) => {
          return (
            <Task
            key={index}
              name={task.name}
              done={task.done}
              onToggle={(done) => updateDone(index, done)}
              onDelete={()=> {
                deleteTask(index);
              }}
              onUpdate={newname=>{
                updateTask(index,newname);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
