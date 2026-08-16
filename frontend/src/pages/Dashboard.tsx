import React from 'react'
import announcements from '../data/announcements.json'
import styles from './Dashboard.module.css'

export default function Dashboard(){
  return (
    <div>
      <h1>Dashboard</h1>
      <section className={styles.greeting}>
        <h2>Welcome back!</h2>
        <p>Here's a quick summary of your HR status.</p>
      </section>

      <section className={styles.stats}>
        <div className={styles.tile}>
          <div className={styles.label}>Leave Balance</div>
          <div className={styles.value}>12 days</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.label}>Pending Requests</div>
          <div className={styles.value}>2</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.label}>Next Payday</div>
          <div className={styles.value}>2026-08-31</div>
        </div>
      </section>

      <section className={styles.announcements}>
        <h3>Recent Announcements</h3>
        <ul>
          {announcements.map(a => (
            <li key={a.id} className={styles.announcement}>
              <strong>{a.title}</strong>
              <div className={styles.date}>{a.date}</div>
              <p>{a.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
