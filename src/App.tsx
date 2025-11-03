import { useState } from 'react'
import './App.css'
import {useTodo} from "./store/usteTodo"

function App() {
  const [Todo, setTodo] = useState()

  type Todo = {
    todo: {
      id: string;
      title: string;
    }[];
    setTodo: (Todo: {id: string; title: string}) => void;
  }


  return (
      <div id='root' className='flex justify-center items-start'>
        <div className='flex flex-col justify-center items-center mt-32 bg-white p-8 gap-2.5 rounded-lg shadow-lg w-[560px] h-[238px]'>
          <h1 className='text-[28px] text-[#063251] tracking-widest font-bold'>Grocery Bud</h1>
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              setTodo({id: useTodo})
            }} className="flex w-full rounded-md overflow-hidden shadow-sm mt-2">
              <input type="text" placeholder="e.g. bread" className="pl-4 py-1 placeholder-[#617d98] bg-[#F1F5F8] min-w-[416px] h-[30px] focus:outline-none"/>

              <button type="submit" className="bg-[#A5D5F8] px-2 py-1 text-[#1B0000] font-light tracking-widest hover:bg-[#49A6E9] hover:text-white cursor-pointer transition-colors duration-500">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default App
