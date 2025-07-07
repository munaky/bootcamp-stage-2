

export default function Todos({todos, setTodos}: any) {
    function handleDelete(id: any){
        setTodos(todos.filter((v: any) => v.id != id))
    }

    function handleToggle(id: any){
        setTodos(todos.map((v: any) => {
            if(v.id == id) v.completed = !v.completed

            return v;
        }))
    }

    return (
        <div className="space-y-2 mt-4">
            {todos.map((v: any) => (
                        <div key={v.id} className="w-full flex flex-nowrap gap-2">
                            <p onClick={() => handleToggle(v.id)} className={"grow " + (v.completed ? 'line-through text-gray-500' : '')}>• {v.text}</p>
                            <button className="shrink rounded py-1 px-2 font-semibold text-white bg-red-500 hover:bg-red-600" onClick={() => handleDelete(v.id)}>Del</button>
                        </div>
                )
            )}
        </div>
    );
}