export interface Todo{
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  deleteAll: () => void;
  createTodo: (text: string) => void;
  updateTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  loading: boolean;
}