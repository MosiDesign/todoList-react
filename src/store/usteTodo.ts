import { create } from "zustand";

type ToDo = {
  todo: {
    id: string;
    title: string;
  }[];
  setTodo: (Todo: { id: string; title: string }) => void;
  removeTodo:(id:string)=>void;
  editTodo: (id: string, title: string ) => void;
  clearTodo:()=>void;
};

export const useTodo = create<ToDo>()((set) => ({
  todo: [],
  setTodo: (newTodo) => set((todos) => ({ todo: [...todos.todo, newTodo] })),
  removeTodo: (id) =>
    set((state) => ({ todo: state.todo.filter((item) => item.id !== id) })),

  editTodo: (id, newTitle) =>
    set((state) => ({
      todo: state.todo.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      ),
    })),

  clearTodo: () => set({ todo: [] }),
}));