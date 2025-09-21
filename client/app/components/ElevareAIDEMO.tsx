'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot } from 'lucide-react'

// Import extracted components
import TaskInput from './TaskInput'
import MessageBubble from './MessageBubble'
import LoadingIndicator from './LoadingIndicator'

// Types
interface Task {
  id: string
  name: string
  priority?: number
}

interface TaskSuggestion {
  name: string
  rationale: string
}

interface ExplorationResponse {
  type: 'clarifying-question' | 'brainstorm'
  content: string
  suggestions?: string[]
  reflection_question?: string
  progressive_path?: string
  identity_impact?: string
}

interface AIResponse {
  success: boolean
  mode: 'task-suggestion' | 'exploration'
  suggestion?: TaskSuggestion
  exploration?: ExplorationResponse
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  aiResponse?: AIResponse
}


// Main Demo Component
export default function ElevareAIDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m Elevare, your AI productivity coach. I can help you discover your ONE Thing for today. Try asking me something like "What should I focus on?" or add some tasks first!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
  if (!input.trim() || isLoading) return

  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: input,
    timestamp: new Date()
  }

  setMessages(prev => [...prev, userMessage])
  setInput('')
  setIsLoading(true)

  try {
    const aiResponse = await callElevareAI(input, tasks.length > 0 ? tasks : undefined)
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse.mode === 'task-suggestion' 
        ? `I've analyzed your tasks and found your ONE Thing!`
        : `Let me help you discover your ONE Thing!`,
      timestamp: new Date(),
      aiResponse
    }

    setMessages(prev => [...prev, aiMessage])
  } catch (error) {
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: 'Sorry, I encountered an error. Please try again!',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, errorMessage])
  } finally {
    setIsLoading(false)
  }
}

  const quickPrompts = [
    "What should I focus on today?",
    "I want to learn Python",
    "Help me be more productive",
    "I need to improve my health"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Elevare AI Assistant
            </h1>
          </motion.div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your AI productivity coach that adapts to help you discover your ONE Thing. 
            Add tasks for focused suggestions, or chat freely for exploration and guidance.
          </p>
        </div>

        {/* Task Input Component */}
        <TaskInput tasks={tasks} setTasks={setTasks} />

        {/* Chat Interface */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
            </AnimatePresence>
          </div>

          {/* Quick Prompts */}
          {!isLoading && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything about productivity..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mode Indicator */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200 text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full ${
              tasks.length > 0 ? 'bg-green-500' : 'bg-purple-500'
            }`} />
            {tasks.length > 0 ? 'Task Suggestion Mode' : 'Exploration Mode'}
          </div>
        </div>
      </div>
    </div>
  )
}