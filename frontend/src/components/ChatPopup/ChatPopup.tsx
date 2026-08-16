import React, { useState, useRef, useEffect } from 'react'
import styles from './ChatPopup.module.css'

type Msg = { id:number, from: 'user'|'agent', text: string }

export default function ChatPopup(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, from: 'agent', text: "Hi, I'm your HR assistant. Ask me about leave, payroll, or policies." }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement|null>(null)
  const listRef = useRef<HTMLDivElement|null>(null)

  useEffect(()=> { if(open) inputRef.current?.focus() }, [open])
  useEffect(()=> { listRef.current?.scrollTo({ top: 99999, behavior:'smooth' }) }, [messages])

  async function send(){
    if(!input.trim()) return
    const userMsg: Msg = { id: Date.now(), from: 'user', text: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try{
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: userMsg.text, history: newMessages }) })
      const data = await res.json()
      const reply: string = data?.reply || "Sorry, I don't have an answer right now."
      setMessages(m=> [...m, { id: Date.now()+1, from:'agent', text: reply }])
    }catch(err){
      setMessages(m=> [...m, { id: Date.now()+1, from:'agent', text: "Sorry, I couldn't reach the assistant. Please try again later." }])
    }finally{ setLoading(false) }
  }

  function onKey(e: React.KeyboardEvent){ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send() } }

  return (
    <div>
      {open && (
        <div className={styles.window} role="dialog" aria-label="HR chat">
          <div className={styles.header}>
            <div>Ask HR</div>
            <button className={styles.close} onClick={()=>setOpen(false)}>✕</button>
          </div>
          <div className={styles.list} ref={listRef}>
            {messages.map(m=> (
              <div key={m.id} className={m.from==='agent' ? styles.agentMsg : styles.userMsg}>
                {m.text}
              </div>
            ))}
            {loading && <div className={styles.typing}>HR is typing…</div>}
          </div>
          <div className={styles.inputRow}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} placeholder="Ask a question..." />
            <button onClick={send} className={styles.send}>Send</button>
          </div>
        </div>
      )}

      <button className={styles.launch} onClick={()=>setOpen(s=>!s)}>Ask HR</button>
    </div>
  )
}
