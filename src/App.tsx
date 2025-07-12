import {TodoInput} from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { Spinner } from "./components/Spinner";
import { useTodo } from "./hooks/useTodo";

function App() {
    const { todos, loading, deleteAll } = useTodo()
    const notComplete = todos.filter(todo => !todo.completed).length;
    
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Todo App</h1>
                    {loading && <Spinner></Spinner>}
                </div>

                <TodoInput />

                <TodoList />

                <div className="flex justify-between items-center">
                    <p className="text-sm">You have {notComplete} pending tasks</p>
                    <button onClick={() => deleteAll()} className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
