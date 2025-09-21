'use client'

import { useState } from 'react'
import { Target } from 'lucide-react'

interface Task {
  id: string
  name: string
  priority?: number
}

interface TaskInputProps {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}

export default function TaskInput({ tasks, setTasks }: TaskInputProps) {
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), name: newTask.trim() }])
      setNewTask('')
    }
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Target className="w-4 h-4" />
        Current Tasks (Optional)
      </h3>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
              <span className="text-gray-700">{task.name}</span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}