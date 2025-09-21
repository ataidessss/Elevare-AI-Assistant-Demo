'use client'

import { useState } from 'react'


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
    <div className="border-t border-gray-200 pt-3">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add context (tasks, goals)..."
          className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#7C3AED] focus:border-[#7C3AED] text-gray-700 placeholder-gray-400"
        />
        <button
          onClick={addTask}
          className="px-3 py-1.5 bg-[#14B8A6] text-white rounded hover:bg-[#0F9488] transition-colors text-xs"
        >
          Add
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="space-y-1">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between bg-gray-50 px-2 py-1 rounded text-xs">
              <span className="text-gray-700">{task.name}</span>
              <button
                onClick={() => removeTask(task.id)}
                className="text-[#7C3AED] hover:text-[#6D28D9] text-xs transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}