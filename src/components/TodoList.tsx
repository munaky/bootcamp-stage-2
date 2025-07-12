import { useTodo } from "../hooks/useTodo"
import { TodoItem } from "./TodoItem"

export const TodoList = () => {
    const { todos } = useTodo();
    console.log(todos)

    return (
        <ul className="space-y-2 mb-4">
            {
                todos.length > 0 ?
                    todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
                    :
                    (<p className="font-semibold text-gray-500">No tasks have been added yet.</p>)
            }
        </ul>
    )
}