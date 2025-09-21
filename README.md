# Elevare AI Assistant Demo

A beautiful, interactive demo showcasing the two-mode AI assistant functionality with a modern chatbot interface.

## Features

### 🎯 Two-Mode Operation
- **Task Suggestion Mode**: When tasks are added, provides focused recommendations.
- **Exploration Mode**: When no tasks exist, acts as a productivity coach.

### 🎨 Modern UI Components
- Animated message bubbles with Framer Motion.
- Real-time typing indicators.
- Beautiful gradient backgrounds.
- Responsive design with Tailwind CSS.
- Interactive task management.
- Quick prompt suggestions.

### 🧠 AI Response Types
- **Task Suggestions**: Focused ONE Thing recommendations with rationale
- **Brainstorm Sessions**: Multiple actionable suggestions
- **Clarifying Questions**: Guided discovery conversations
- **Reflection Prompts**: Deep thinking questions
- **Progressive Paths**: Step-by-step guidance
- **Identity Impact**: Personal growth insights

## Quick Start

### Copy & Paste Setup
This demo is completely self-contained. Just copy the `page.tsx` file into any Next.js project with these dependencies:

```json
{
  "framer-motion": "^12.0.0",
  "lucide-react": "^0.400.0",
  "tailwindcss": "^3.0.0"
}
```

### Usage Examples

1. **Start with Exploration Mode**
   - Try: "What should I focus on today?"
   - Try: "I want to learn Python"
   - Try: "Help me be more productive"

2. **Switch to Task Suggestion Mode**
   - Add tasks using the task input section
   - Ask: "What should I work on?"
   - Get focused recommendations

3. **Interactive Features**
   - Use quick prompt buttons
   - Add/remove tasks dynamically
   - See mode indicator at bottom

## Mock AI Responses

The demo includes intelligent mock responses that simulate the real AI behavior:

- **Python/Coding queries** → Development-focused suggestions
- **Health/Fitness queries** → Wellness-focused actions  
- **Vague inputs** → Clarifying questions
- **General queries** → Productivity suggestions
- **With tasks** → Task-specific recommendations

## Customization

### Styling
- All styles use Tailwind CSS classes
- Easy to customize colors, spacing, and animations
- Responsive design works on all screen sizes

### Mock Responses
- Edit the `mockAICall` function to add new response patterns
- Customize suggestions for different domains
- Add new psychological elements (reflection questions, identity impact, etc.)

### Components
- `TaskInput`: Manages current tasks
- `MessageBubble`: Chat message display
- `AIResponseCard`: Rich AI response formatting
- `LoadingIndicator`: Animated typing indicator

## Integration with Real API

To connect to the actual Elevare AI backend:

1. Replace `mockAICall` with real API call:
```typescript
const callAI = async (prompt: string, tasks?: Task[]): Promise<AIResponse> => {
  const response = await fetch('http://localhost:5000/api/ai/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, currentTasks: tasks })
  })
  return response.json()
}
```

2. Update error handling and loading states as needed

## File Structure
```
demo/
├── page.tsx          # Main demo component (self-contained)
├── README.md         # This file
└── components/       # Optional: Extract components for reuse
    ├── TaskInput.tsx
    ├── MessageBubble.tsx
    ├── AIResponseCard.tsx
    └── LoadingIndicator.tsx
```

## Dependencies Used
- **React 19**: Latest React features
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

## Demo Highlights

### Visual Features
- Gradient backgrounds and smooth transitions
- Color-coded modes (green for task mode, purple for exploration)
- Animated message appearances
- Interactive hover states
- Mobile-responsive design

### UX Features
- Quick prompt suggestions for easy testing
- Real-time mode switching
- Task management with add/remove
- Typing indicators during AI "thinking"
- Timestamp display for messages

### AI Simulation
- Context-aware responses based on input
- Different response types (suggestions, questions, brainstorms)
- Psychological elements (reflection, identity, progressive paths)
- Domain-specific suggestions (coding, health, productivity)

Perfect for demos, presentations, or as a starting point for the real implementation!