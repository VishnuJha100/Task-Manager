import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'

const UserDashboard = () => {
  useUserAuth()
  return (
    <div>
      Hello
    </div>
  )
}

export default UserDashboard
