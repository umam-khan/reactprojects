// import { useContext, createContext, useState } from 'react'
// import axios from "axios";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import {QueryClient, QueryClientProvider  } from "@tanstack/react-query";
// export const AppContext = createContext()
const client = new QueryClient()

function App() {
  // const [user,setUser] = useState("")
  
  return (
    <QueryClientProvider client={client}>
    <div className='app'>
      {/* <AppContext.Provider value={{user, setUser}} > */}
      <Router>
        <div>
          <h1>Navbar</h1>
          <Link to="/">Home </Link>
          <Link to="/profile">Profile </Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
      {/* </AppContext.Provider> */}
    </div>
    </QueryClientProvider>
    
  )
}

export default App
