import React, { useState } from 'react'
import employeesData from '../data/employees.json'
import styles from './Employees.module.css'

export default function Employees(){
  const [query, setQuery] = useState('')
  const filtered = employeesData.filter(e=> (
    e.name.toLowerCase().includes(query.toLowerCase()) ||
    e.role.toLowerCase().includes(query.toLowerCase()) ||
    e.department.toLowerCase().includes(query.toLowerCase())
  ))

  return (
    <div>
      <h1>Employees</h1>
      <div className={styles.searchWrap}>
        <input placeholder="Search by name, role, department" value={query} onChange={e=>setQuery(e.target.value)} />
      </div>
      <table className={styles.table}>
        <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Email</th></tr></thead>
        <tbody>
          {filtered.map(e=> (
            <tr key={e.id}><td>{e.name}</td><td>{e.role}</td><td>{e.department}</td><td>{e.email}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
