'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'agent'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: 'Hello! I\'m your AI Agent assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const agentResponses = [
    "I understand your request. Let me help you with that.",
    "That's an interesting question! Based on my analysis, I would suggest...",
    "I've processed your input. Here's what I think would be most helpful:",
    "Great question! Let me break this down for you...",
    "I'm analyzing your request. From what I can see, the best approach would be...",
    "Absolutely! I can assist with that. Here's my recommendation:",
    "I've considered several options, and I believe this is the optimal solution:",
    "Let me provide you with a comprehensive answer to that...",
    "After processing your query, here's what I found:",
    "Excellent! I've got just the thing for you..."
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isProcessing) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsProcessing(true)

    // Simulate agent processing
    setTimeout(() => {
      const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)]
      const contextualResponse = `${randomResponse}\n\nRegarding "${userMessage.substring(0, 50)}${userMessage.length > 50 ? '...' : ''}", I've analyzed the context and can provide guidance. As an AI agent, I can help you with:\n\n• Problem-solving and analysis\n• Task automation recommendations\n• Information synthesis\n• Decision support\n\nIs there anything specific you'd like me to elaborate on?`

      setMessages(prev => [...prev, { role: 'agent', content: contextualResponse }])
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="container">
      <div className="hero">
        <h1>AI Agent</h1>
        <p>Your Intelligent Assistant for Complex Tasks</p>
      </div>

      <div className="agent-card">
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-label">
                {message.role === 'user' ? 'You' : 'Agent'}
              </div>
              <div className="message-text">{message.content}</div>
            </div>
          ))}
          {isProcessing && (
            <div className="message agent">
              <div className="message-label">Agent</div>
              <div className="message-text typing">Processing your request...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isProcessing}
          />
          <button type="submit" disabled={isProcessing || !input.trim()}>
            Send
          </button>
        </form>

        <div className="status">
          {isProcessing ? 'Agent is thinking...' : 'Ready to assist'}
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🤖 Autonomous</h3>
          <p>Makes intelligent decisions and takes action based on your goals</p>
        </div>
        <div className="feature-card">
          <h3>🧠 Intelligent</h3>
          <p>Understands context and provides relevant, thoughtful responses</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Fast</h3>
          <p>Processes requests quickly and efficiently</p>
        </div>
        <div className="feature-card">
          <h3>🎯 Goal-Oriented</h3>
          <p>Focuses on achieving your objectives with precision</p>
        </div>
      </div>
    </div>
  )
}
