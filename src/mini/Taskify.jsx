import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { motion } from "framer-motion"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [showCompleted, setShowCompleted] = useState(false);
    const inputRef = useRef(null);

    const { theme } = useContext(ThemeContext)
    const isDark = theme === "dark"

    // Focus input on load
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const toggleComplete = (e) => {
        setShowCompleted(e.target.checked);
    };

    const filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.iscompleted);

    const handleKeyPress = useCallback((e) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    }, [todo, todos]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    const handleAdd = () => {
        if (!todo.trim()) {
            alert("Task cannot be empty!");
            return;
        }
        setTodos([...todos, { todo, id: uuidv4(), iscompleted: false }]);
        setTodo("");
        inputRef.current.focus();
    };

    const handlechange = (e) => {
        setTodo(e.target.value);
    };

    const handlecheckbox = (e) => {
        const id = e.target.name;
        const updatedTodos = todos.map(item =>
            item.id === id ? { ...item, iscompleted: !item.iscompleted } : item
        );
        setTodos(updatedTodos);
    };

    const handleEdit = (e, id) => {
        const itemToEdit = todos.find(i => i.id === id);
        setTodo(itemToEdit.todo);
        const updatedTodos = todos.filter(item => item.id !== id);
        setTodos(updatedTodos);
        inputRef.current.focus();
    };

    const handleDelete = (e, id) => {
        if (!confirm("Are you sure you want to delete this task?")) {
            return;
        }
        const updatedTodos = todos.filter(item => item.id !== id);
        setTodos(updatedTodos);
        inputRef.current.focus();
    };

    return (
        <>
            <motion.div
                initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                animate={{ clipPath: 'circle(150% at 50% 50%)' }}
                exit={{ clipPath: 'circle(0% at 50% 50%)' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
                <main className={`container max-w-[80vw] mx-auto my-5 pb-10 p-5 pt-0 rounded-2xl border bg-blue-800/20 backdrop-blur-[2px]`}>
                    <div className='flex justify-center bg-[#FFA500] rounded-bl-3xl rounded-br-3xl'>
                        <h1 className='font-bold text-2xl text-[#0f1056] p-5'>&lt;&#x2f;&gt; Taskify - Your Task Manager</h1>
                    </div>
                    <div className='container p-2 mx-auto'>
                        <h2 className='font-bold text-xl m-2'>Add Task</h2>
                        <div>
                            <input
                                type="text"
                                value={todo}
                                ref={inputRef}
                                onChange={handlechange}
                                className='newtask border border-gray-500 rounded-lg p-2 mr-2 focus:outline-none focus:border-blue max-w-[50%] min-w-[50%] focus:ring-2 focus:ring-blue-500'
                            />
                            <button className='bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-[#FFA500] transition-colors' onClick={handleAdd}>
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="checkbox m-2">
                        <input onChange={toggleComplete} type="checkbox" name="Show Completed Tasks" id='show_completed_tasks' className='mr-2 accent-[#FFA500]' />
                        <span>Completed Tasks</span>
                    </div>
                    <h2 id='yourtasks' className='font-bold text-xl m-2'>Tasks To Do</h2>
                    <div className='TODOS'>
                        {filteredTodos.length === 0 && <h1 className='text-center text-2xl font-bold'>No Task Found</h1>}
                        {filteredTodos.map(items => {
                            return (
                                <div key={items.id} className="todoscontainer m-2 p-2 mx-auto flex justify-between items-center max-w-[80vw]">
                                    <div className='mr-2 flex max-w-[70vw] gap-2'>
                                        <input checked={items.iscompleted} onChange={handlecheckbox} type="checkbox" name={items.id} id="" className='mt-1 accent-[#FFA500]' />
                                        <div className="break-words whitespace-normal">
                                            <span className={`${items.iscompleted ? "line-through" : ""} break-words`} name="todo" >{items.todo}</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div
                                            className="w-12 h-12 bg-indigo-700 rounded-lg flex items-center justify-center hover:bg-[#FFA500] transition-colors cursor-pointer"
                                            onClick={(e) => handleEdit(e, items.id)}
                                            title="Edit"
                                        >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ width: "24px", height: "24px" }}
                                            ></lord-icon>
                                        </div>

                                        <div
                                            className="w-12 h-12 bg-indigo-700 rounded-lg flex items-center justify-center hover:bg-[#FFA500] transition-colors cursor-pointer"
                                            onClick={(e) => handleDelete(e, items.id)}
                                            title="Delete"
                                        >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover"
                                                style={{ width: "24px", height: "24px" }}
                                            ></lord-icon>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </main>
            </motion.div>
        </>
    )
}

export default App
