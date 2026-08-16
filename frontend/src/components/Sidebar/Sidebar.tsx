import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>PeopleHub — HR Portal</header>
      <nav className={styles.nav}>
        <NavLink to="/" end className={({isActive})=> isActive? styles.active: ''}>Dashboard</NavLink>
        <NavLink to="/leave" className={({isActive})=> isActive? styles.active: ''}>Leave</NavLink>
        <NavLink to="/employees" className={({isActive})=> isActive? styles.active: ''}>Employees</NavLink>
        <NavLink to="/policies" className={({isActive})=> isActive? styles.active: ''}>Policies</NavLink>
      </nav>
    </aside>
  )
}
