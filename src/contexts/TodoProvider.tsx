import { useState } from 'react';
import type { Todo } from '../types/todo';
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [idCounter, setIdCounter] = useState(1);

  const createTodo = (text: string) => {
    setLoading(true);
    const newTodo: Todo = { id: idCounter, text, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
    setIdCounter((prev) => prev + 1);
    setTimeout(() => setLoading(false), 500);
  };

  const updateTodo = (id: number, text: string) => {
    setLoading(true);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    setTimeout(() => setLoading(false), 500);
  };

  const deleteTodo = (id: number) => {
    setLoading(true);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    setTimeout(() => setLoading(false), 500);
  };

  const deleteAll = () => {
    setLoading(true);
    setTodos([]);
    setTimeout(() => setLoading(false), 100);
  }

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, deleteAll, createTodo, updateTodo, deleteTodo, toggleComplete, loading }}
    >
      {children}
    </TodoContext.Provider>
  );
};