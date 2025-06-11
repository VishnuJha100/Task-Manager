import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'

const Dashboard = () => {
  useUserAuth()
  return (
    <div>
      Hello
    </div>
  )
}

export default Dashboard
