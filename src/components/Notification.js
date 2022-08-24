/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const styles = {
    notify: {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    },
    hidden: {
      display: 'none',
    },
  }
  if (notification.message === null) {
    return null
  }
  return (
    <div className={styles[notification.style]}>{notification.message}</div>
  )
}

export default Notification
