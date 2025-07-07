export default function TodoInput({ input, setInput, todos, setTodos }: any) {

    function updateTodos(){
        if(!input) return;

        setTodos([...(todos as any), {
            id: Date.now(),
            text: input,
            completed: false,
        }]);

        setInput('');
    }

    return (
        <>
            <div className="w-full flex flex-nowrap gap-2">
                <input type="text" id="text" onChange={(e: any) => setInput(e.target.value)} value={input} className="grow rounded border-1 bg-gray-200 border-gray-500" />
                <button onClick={() => updateTodos()} className="shrink rounded py-1 px-2 font-semibold text-white bg-green-500 hover:bg-green-600">Add</button>
            </div>
        </>
    );
}