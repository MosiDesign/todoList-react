import { useState } from 'react';
import './App.css';
import { useTodo } from "./store/useTodo";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const {todo, setTodo, removeTodo, editTodo, clearTodo} = useTodo();
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    if (isEditing && editId) {
      editTodo(editId!, trimmed);
      setIsEditing(false);
      setEditId(null);
    } else {
      setTodo({ id: uuidv4(), title: trimmed });
    }

    setTitle("");
  };

  const handleEditClick = (item: { id: string; title: string }) => {
    setTitle(item.title);
    setIsEditing(true);
    setEditId(item.id);
  };

  return (
    <div id='root' className='flex justify-center items-start'>
      <div className='flex flex-col justify-center items-center mt-32 bg-white p-8 gap-2 rounded-lg shadow-lg w-[560px] min-h-[238px]'>

        <h1 className='text-[28px] text-[#063251] tracking-[4px] font-bold'>Grocery Bud</h1>

        <form onSubmit={handleSubmit} className="flex w-full rounded-md overflow-hidden shadow-sm mt-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. bread"
            className="pl-4 py-1 placeholder-[#617d98] text-[#617d98] bg-[#F1F5F8] grow focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#A5D5F8] px-4 py-1 text-[#1B0000] font-light tracking-widest hover:bg-[#49A6E9] hover:text-white cursor-pointer transition-colors duration-500"
          >
            Submit
          </button>
        </form>

        {todo.length > 0 && (
          <ul className="flex flex-col w-full mt-4 gap-2">
            {todo.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center px-4 py-2 group rounded-md hover:bg-[#f1f5f8] transition-all duration-200 ease-linear"
              >
                <span className="capitalize tracking-widest group-hover:text-[#617d98] text-[#102a42] transition-colors duration-200">{item.title}</span>
                <div className="flex gap-3">
                  <button
                    className="text-green-500 hover:text-green-700 transition-all"
                    title="Edit item"
                    onClick={() => handleEditClick(item)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700 transition-all"
                    title="Delete item"
                    onClick={() => removeTodo(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {todo.length > 0 && (
          <button
            onClick={clearTodo}
            className="text-[#e66b6b] tracking-[2px] capitalize hover:text-red-600 transition-all duration-300 mt-2"
          >
            clear items
          </button>
        )}

      </div>
    </div>
  );
}

export default App;
