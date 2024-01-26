import React, { useState, useContext } from 'react';
// import { AppContext } from '../App';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { addTodo, fetchTodos } from "../api/index"
import TodoCard from "../components/TodoCard"
const Home = () => {
  const [title, setTitle] =useState("")
  // // const {user} = useContext(AppContext)

  // don't have to create a state for getting data from api !! better than useEffect 

  const queryClient = useQueryClient();

  const {data : todos, isLoading} = useQuery({
    queryFn : ()=> fetchTodos(search),
    queryKey : ["todos", {search}]
  })
  // anything passed thru queryFn should be added to queryKey aswell 
  const {mutateAsync : addTodoMutation} = useMutation({
    mutationFn : addTodo,
    onSuccess : ()=> {
      queryClient.invalidateQueries(["todos"])
    }
  })

  if(isLoading){
    return <div>loading...</div>
  }
  return (
  <div>
    <div>
      <input type="text" onChange={(e)=> setTitle(e.target.value)} />
      <button onClick={async()=> {
        try{
          await addTodoMutation({title});
          setTitle("");
        }
        catch(e){
          console.log(e);
        }
      }}>Add Todo</button>
    </div>
    {todos?.map((todo)=> {
      return <TodoCard key={todo.id} todo={todo} />
    })}
  </div>
  );
};

  //this is for catfacts api
  // () => {
  //   return axios.get("https://catfact.ninja/fact").then((res)=> res.data);
  // },
  // <div>{data?.fact}</div>

export default Home;
