'use client'

import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import AIResponseCard from './AIResponseCard'

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

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-purple-500'
      }`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      
      <div className={`max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {message.content}
        </div>
        
        {message.aiResponse && (
          <AIResponseCard response={message.aiResponse} />
        )}
        
        <div className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  )
}