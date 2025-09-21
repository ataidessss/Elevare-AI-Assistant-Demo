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
- **Task Suggestions**: Focused ONE Thing recommendations with rationale.
- **Brainstorm Sessions**: Multiple actionable suggestions.
- **Clarifying Questions**: Guided discovery conversations.
- **Reflection Prompts**: Deep thinking questions.
- **Progressive Paths**: Step-by-step guidance.
- **Identity Impact**: Personal growth insights.


### Usage Examples

1. **Start with Exploration Mode**
   - Try: "What should I focus on today?."
   - Try: "I want to learn x."
   - Try: "Help me be more productive".

2. **Switch to Task Suggestion Mode**
   - Add tasks using the task input section.
   - Ask: "What should I work on?".
   - Get focused recommendations.

3. **Interactive Features**
   - Add/remove tasks dynamically.
   - See mode indicator at bottom.


## Customization

### Styling
- All styles use Tailwind CSS classes.
- Easy to customize colors, spacing, and animations.
- Responsive design works on all screen sizes.

### Components
- `TaskInput`: Manages current tasks.
- `MessageBubble`: Chat message display.
- `AIResponseCard`: Rich AI response formatting.
- `LoadingIndicator`: Animated typing indicator.


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
- **Framer Motion**: Smooth animations.
- **Lucide React**: Beautiful icons.
- **Tailwind CSS**: Utility-first styling.
- **TypeScript**: Type safety.

## Demo Highlights

### Visual Features
- Gradient backgrounds and smooth transitions.
- Color-coded modes (green for task mode, purple for exploration).
- Animated message appearances.
- Interactive hover states.
- Mobile-responsive design.

### UX Features
- Real-time mode switching.
- Task management with add/remove.
- Typing indicators during AI "thinking".
- Timestamp display for messages.
