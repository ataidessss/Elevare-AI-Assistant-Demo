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

export const callElevareAI = async (prompt: string, tasks?: Task[]): Promise<AIResponse> => {
  try {
    const response = await fetch('https://elevare-ai-assistant.vercel.app/api/ai/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        currentTasks: tasks
      })
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error calling Elevare AI:', error)

    // Fallback response in case of API failure
    return {
      success: false,
      mode: 'exploration',
      exploration: {
        type: 'clarifying-question',
        content: 'I\'m having trouble connecting right now. What would you like to focus on today?'
      }
    }
  }
}

// Production API integration with authentication.
export const callElevareAIWithAuth = async (
  prompt: string,
  tasks?: Task[],
  authToken?: string
): Promise<AIResponse> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add authentication if token is provided
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }

    const response = await fetch('https://elevare-ai-assistant.vercel.app/api/ai/suggest', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        prompt,
        currentTasks: tasks
      })
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required')
      }
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error calling Elevare AI:', error)

    // Fallback response
    return {
      success: false,
      mode: 'exploration',
      exploration: {
        type: 'clarifying-question',
        content: 'I\'m having trouble connecting right now. What would you like to focus on today?'
      }
    }
  }
}

