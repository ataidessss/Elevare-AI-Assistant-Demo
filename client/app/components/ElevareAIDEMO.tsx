'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot } from 'lucide-react'

// Import extracted components
import TaskInput from './TaskInput'
import MessageBubble from './MessageBubble'
import LoadingIndicator from './LoadingIndicator'
import AIResponseCard from './AIResponseCard'

// Import API function
import { callElevareAI } from '../api'

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
      content: 'Welcome! I\'m here to help you cut through the overwhelm and discover your ONE Thing - the most important action that will make everything else easier or unnecessary. What\'s been on your mind lately? What challenges are you facing, or what goals are calling to you?',
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
        content: aiResponse.suggestion?.name || aiResponse.exploration?.content || 'I\'m here to help you discover your ONE Thing.',
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
            <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#14B8A6] bg-clip-text text-transparent">
              Elevare AI Assistant
            </h1>
          </motion.div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your AI productivity coach that adapts to help you discover your ONE Thing.
            Add tasks for focused suggestions, or chat freely for exploration and guidance.
          </p>
        </div>

        {/* Conversation History - FIRST */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#7C3AED]/10 shadow-lg mb-6">
          <div className="border-b border-[#7C3AED]/10 p-4">
            <h4 className="text-lg font-semibold text-[#7C3AED] text-center">
              Our Conversation Journey
            </h4>
            <p className="text-sm text-gray-600 text-center mt-1">
              Discovering clarity through thoughtful dialogue
            </p>
          </div>
          <div className="h-96 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
            </AnimatePresence>
          </div>
        </div>

        {/* Minimalist Input Section */}
        <div className="bg-white/60 rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="What's on your mind? Share your thoughts..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] text-gray-700 placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          {/* Minimalist Task Input */}
          <TaskInput tasks={tasks} setTasks={setTasks} />
        </div>

        {/* Simple Mode Indicator */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full border border-gray-200 text-xs text-gray-600">
            <div className={`w-2 h-2 rounded-full ${tasks.length > 0 ? 'bg-[#14B8A6]' : 'bg-[#7C3AED]'}`} />
            {tasks.length > 0 ? 'Context Mode' : 'Discovery Mode'}
          </div>
        </div>
      </div>
    </div>
  )
}