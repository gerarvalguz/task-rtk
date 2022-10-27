import { useSelector, useDispatch } from "react-redux"
import { deleteTask } from "../features/tasks/taskSlice"
import { Link } from "react-router-dom"

const TaskList = () => {

    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    const handleDelete = (id) =>{
        dispatch(deleteTask(id))
    }

  return (
    <div className="w-4/6">
        <header className="flex justify-between items-center p-4">
            <h1 className="font-bold text-4xl">Total {tasks.length === 1 ? 'task:' : 'tasks:'} {tasks.length === 0 ? '' : tasks.length }</h1>
            <Link to='/new-task' 
                  className="bg-indigo-600 rounded-lg px-2 py-1">
                New Task
            </Link>
        </header>

        <div className="grid grid-cols-3 gap-4">
            {tasks.map(task => (
                <div key={task.id} className="bg-neutral-900 p-4 rounded-md">
                    <header className="flex justify-between">
                        <h3 className="text-2xl font-bold">
                            {task.title}
                        </h3>
                        <div className="flex">
                            <Link 
                                to={`/edit-task/${task.id}`}
                                className="bg-yellow-600 rounded-md p-1 mr-2"
                            >
                                Edit
                            </Link>
                            <button 
                                onClick={ () => handleDelete(task.id) }
                                className="bg-red-800 rounded-md p-1"
                            >
                                Delete
                            </button>
                            
                        </div>
                    </header>
                    <p className="text-lg text-slate-300">
                        {task.description}
                    </p>
                </div>
            ))}

        </div>
    </div>
  )
}

export default TaskList