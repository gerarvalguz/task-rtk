import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, editTask } from '../features/tasks/taskSlice'
import { v4 as uuid } from 'uuid'


const TaskForm = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const params = useParams()

    const tasks = useSelector(state => state.tasks)

    const [task, setTask] = useState({
        title:'',
        description:'',
        completed: false
    })

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(params.id){
            dispatch(editTask(task))
        }else{
            dispatch(addTask({
                ...task,
                id: uuid()
            }))

            
        }
        navigate('/')
        
    }

    useEffect(() => {
        if(params.id){
            setTask(tasks.find(task => task.id === params.id))
        }
    }, [tasks, params.id])
    

  return (
    <>
        <div className="block">

            <h1 className="font-bold text-center text-3xl mb-3 text-yellow-500">
                { params.id ? `Edit ${task.title}`  : "Add new task" }
            </h1>

            <div className="flex justify-center items-center bg-neutral-900 max-w-sm p-4">
                <form onSubmit={ handleSubmit }>
                    <label 
                        htmlFor="title" 
                        className="block text-sm font-bold mb-2"
                    >
                        Task:
                    </label>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        onChange={handleChange} 
                        value={task.title}
                        maxLength="20"
                        className="mb-3 rounded-md text-slate-800 placeholder-slate-500 p-2"
                    />

                    <label 
                        htmlFor="description" 
                        className="block text-sm font-bold mb-2"
                    >
                        Description:
                    </label>
                    <textarea 
                        name="description" 
                        placeholder="Description" 
                        onChange={handleChange}
                        value={task.description}
                        maxLength="30"
                        className="block mb-4 w-full rounded-md text-slate-800 placeholder-slate-500 p-2"
                    >
                        
                    </textarea>
                    
                    <button className="bg-indigo-600 rounded-md px-3 py-1">
                        Save
                    </button>

                </form>
            </div>
        </div>
    </>
  )
}

export default TaskForm