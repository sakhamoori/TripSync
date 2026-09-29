import { useState, useRef, useEffect, useMemo } from 'react'
import { getBotReply, createMessage, type ChatMessage } from '../lib/chatbot'

const BOT_NAMES = [
  'James', 'Michael', 'John', 'David', 'Daniel', 'Matthew', 'Christopher',
  'Andrew', 'Joseph', 'William', 'Robert', 'Thomas', 'Ryan', 'Kevin', 'Brian',
  'Emma', 'Olivia', 'Sophia', 'Emily', 'Sarah', 'Jessica', 'Jennifer',
  'Ashley', 'Amanda', 'Elizabeth', 'Samantha', 'Rachel', 'Lauren', 'Megan', 'Hannah',
]

function getAssistantName(): string {
  try {
    const saved = localStorage.getItem('tripsync_bot_name')
    if (saved && BOT_NAMES.includes(saved)) return saved
  } catch { /* ignore */ }
  const name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)]
  try { localStorage.setItem('tripsync_bot_name', name) } catch { /* ignore */ }
  return name
}

const FEMALE_NAMES = new Set([
  'Emma', 'Olivia', 'Sophia', 'Emily', 'Sarah', 'Jessica', 'Jennifer',
  'Ashley', 'Amanda', 'Elizabeth', 'Samantha', 'Rachel', 'Lauren', 'Megan', 'Hannah',
])

function avatarUrl(name: string): string {
  const isFemale = FEMALE_NAMES.has(name)
  const hair = isFemale
    ? 'long01,long02,long03,long04,long05,long06,long07,long08,long09,long10,long11,long12,long13,long14,long15,long16,long17,long18,long19,long20,long21,long22,long23,long24,long25,long26'
    : 'short01,short02,short03,short04,short05,short06,short07,short08,short09,short10,short11,short12,short13,short14,short15,short16,short17,short18,short19'
  const earrings = isFemale ? 50 : 0
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4&radius=50&hair=${hair}&earringsProbability=${earrings}`
}

export function ChatBot() {
  const botName = useMemo(getAssistantName, [])
  const initial = useMemo<ChatMessage>(() => ({
    id: 'welcome',
    role: 'assistant',
    text: `Hi! I'm ${botName}, your travel assistant. Ask me about itineraries, restaurants, hotels, or travel tips for any destination.`,
  }), [botName])

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([initial])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return

    const userMsg = createMessage('user', text)
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = getBotReply(text)
      const botMsg = createMessage('assistant', reply)
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <img src={avatarUrl(botName)} alt={botName} className="chat-header-avatar" />
            <span className="chat-header-title">{botName}</span>
            <button className="chat-close" onClick={() => setOpen(false)}>
              X
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-row chat-row-${msg.role}`}>
                {msg.role === 'assistant' && (
                  <img src={avatarUrl(botName)} alt={botName} className="chat-avatar-img" />
                )}
                <div className={`chat-bubble chat-${msg.role}`}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.startsWith('**') && line.endsWith('**')
                        ? <strong>{line.slice(2, -2)}</strong>
                        : line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {typing && (
              <div className="chat-row chat-row-assistant">
                <img src={avatarUrl(botName)} alt={botName} className="chat-avatar-img" />
                <div className="chat-bubble chat-assistant chat-typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="chat-input-bar">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a destination..."
              autoFocus
            />
            <button className="chat-send" onClick={handleSend} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}

      <button className="chat-fab" onClick={() => setOpen(!open)} title={botName}>
        {open ? 'X' : <img src={avatarUrl(botName)} alt={botName} className="chat-fab-avatar" />}
      </button>
    </>
  )
}
