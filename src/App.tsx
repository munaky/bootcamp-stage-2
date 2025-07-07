import { useState } from "react";

import TodoInput from "./components/TodoInput";
import Todos from "./components/Todos";

interface Todo {
    id: number,
    text: string,
    completed: boolean,
}

type input = string;

const data: Todo[] = [
    { id: 1, text: "todo1", completed: false },
    { id: 2, text: "todo2", completed: true },
];

function App() {
    const [todos, setTodos] = useState<Todo[]>(data);
    const [input, setInput] = useState<input>('');


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow">
                <TodoInput input={input} setInput={setInput} todos={todos} setTodos={setTodos}></TodoInput>
                <Todos todos={todos} setTodos={setTodos}/>
            </div>
        </div>
    );
}

export default App;
