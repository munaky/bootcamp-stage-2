import { Edit, Trash2, Save } from "lucide-react"
import type { Todo } from "../types/todo";
import { useTodo } from "../hooks/useTodo";
import { useState } from "react";

export const TodoItem = ({ todo }: { todo: Todo }) => {
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const [editing, setEditing] = useState<boolean>(false);
    const [input, setInput] = useState<string>(todo.text);

    const handleSave = () => {
        if (input.length < 1) return;

        updateTodo(todo.id, input);
        setEditing(false);
    }

    const handleEdit = (e: any) => {
        e.stopPropagation();
        setEditing(true);
    }

    return (
        <>
            <li onClick={!editing ? () => toggleComplete(todo.id) : () => { }} className={(todo.completed ? 'line-through text-green-600 bg-green-200' : 'bg-gray-100') + " group relative flex justify-between px-4 py-2 rounded-md flex"}>
                {editing ?
                    (<input type="text"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        readOnly={!editing}
                        className={editing ? 'pl-1 bg-indigo-100 rounded' : ''} />)
                    :
                    (<span>{input}</span>)
                }

                {editing ?
                    (
                        <button onClick={handleSave} className="bg-yellow-400 text-white p-1 rounded hover:bg-yellow-500">
                            <Save className="w-4 h-4" />
                        </button>
                    )
                    :
                    (
                        <div className="absolute flex space-x-1 right-2 top-1 p-1 hidden group-hover:block rounded bg-indigo-100">
                            <button onClick={(e) => handleEdit(e)} className="bg-green-500 text-white p-1 rounded hover:bg-green-600">
                                <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    )
                }

            </li>
        </>
    )
}