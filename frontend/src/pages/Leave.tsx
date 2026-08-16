import React, { useState } from 'react'
import initialRequests from '../data/leaveRequests.json'
import styles from './Leave.module.css'

export default function Leave(){
  const [requests, setRequests] = useState(initialRequests)
  const [form, setForm] = useState({ name:'', type:'Vacation', start:'', end:'' })

  function submit(e: React.FormEvent){
    e.preventDefault()
    const next = { id: Date.now(), ...form, status: 'Pending' }
    setRequests(r => [next, ...r])
    setForm({ name:'', type:'Vacation', start:'', end:'' })
  }

  return (
    <div>
      <h1>Leave</h1>
      <section className={styles.left}>
        <h3>Request Leave</h3>
        <form onSubmit={submit} className={styles.form}>
          <label>
            Name
            <input value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} required />
          </label>
          <label>
            Type
            <select value={form.type} onChange={e=>setForm(f=>({...f, type: e.target.value}))}>
              <option>Vacation</option>
              <option>Sick</option>
              <option>Unpaid</option>
            </select>
          </label>
          <label>
            Start
            <input type="date" value={form.start} onChange={e=>setForm(f=>({...f, start: e.target.value}))} required />
          </label>
          <label>
            End
            <input type="date" value={form.end} onChange={e=>setForm(f=>({...f, end: e.target.value}))} required />
          </label>
          <button className={styles.btn} type="submit">Submit Request</button>
        </form>
      </section>

      <section className={styles.right}>
        <h3>Requests</h3>
        <table className={styles.table}>
          <thead>
            <tr><th>Name</th><th>Type</th><th>Start</th><th>End</th><th>Status</th></tr>
          </thead>
          <tbody>
            {requests.map(r=> (
              <tr key={r.id}><td>{r.name}</td><td>{r.type}</td><td>{r.start}</td><td>{r.end}</td><td>{r.status}</td></tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
