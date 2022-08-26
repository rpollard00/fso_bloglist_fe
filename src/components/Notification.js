/* eslint-disable react-redux/useSelector-prefer-selectors */
import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return null
  }
  return (
    <div className="notification is-primary">{notification.message}</div>
  )
}

export default Notification
