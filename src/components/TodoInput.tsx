import { useState } from "react";
import { useTodo } from "../hooks/useTodo";

export const TodoInput = () => {
    const [input, setInput] = useState<string>('');
    const { createTodo } = useTodo();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (input.length < 1) return

        createTodo(input);
        setInput('');
    }

    return (
        <>
            <form className="flex mb-4">
                <input
                    type="text"
                    placeholder="Add new todo"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
                    +
                </button>

            </form>
        </>
    );
}