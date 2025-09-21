'use client'
import { motion } from 'framer-motion'
import { Target, Brain, Sparkles, Lightbulb } from 'lucide-react'

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

interface AIResponseCardProps {
  response: AIResponse
}

export default function AIResponseCard({ response }: AIResponseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-3 bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${
          response.mode === 'task-suggestion' ? 'bg-green-500' : 'bg-purple-500'
        }`} />
        <span className="text-sm font-medium text-gray-600">
          {response.mode === 'task-suggestion' ? 'Task Suggestion Mode' : 'Exploration Mode'}
        </span>
      </div>

      {response.suggestion && (
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Your ONE Thing:</h4>
              <p className="text-gray-700 font-medium">{response.suggestion.name}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Brain className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Why This Matters:</h4>
              <p className="text-gray-600">{response.suggestion.rationale}</p>
            </div>
          </div>
        </div>
      )}

      {response.exploration && (
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-700">{response.exploration.content}</p>
            </div>
          </div>

          {response.exploration.suggestions && (
            <div className="bg-purple-50 rounded-lg p-3">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Suggested Actions:
              </h4>
              <ul className="space-y-2">
                {response.exploration.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-purple-700">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {response.exploration.reflection_question && (
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-semibold text-blue-800 mb-1">Reflection:</h4>
              <p className="text-blue-700 italic">{response.exploration.reflection_question}</p>
            </div>
          )}

          {response.exploration.progressive_path && (
            <div className="bg-green-50 rounded-lg p-3">
              <h4 className="font-semibold text-green-800 mb-1">Progressive Path:</h4>
              <p className="text-green-700">{response.exploration.progressive_path}</p>
            </div>
          )}

          {response.exploration.identity_impact && (
            <div className="bg-orange-50 rounded-lg p-3">
              <h4 className="font-semibold text-orange-800 mb-1">Identity Impact:</h4>
              <p className="text-orange-700">{response.exploration.identity_impact}</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}