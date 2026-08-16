import React, { useState } from 'react'
import policies from '../data/policies.json'
import styles from './Policies.module.css'

export default function Policies(){
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <h1>Policies</h1>
      <div className={styles.list}>
        {policies.map(p=> (
          <div key={p.id} className={styles.item}>
            <button className={styles.title} onClick={()=> setOpen(open===p.id? null: p.id)}>{p.title}</button>
            {open===p.id && <div className={styles.body}>{p.body}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
