import React from 'react'
import { redirect } from 'react-router-dom'

const Loader = () => {
  return (
    <div>
        <h2>User does not exists</h2>
        {redirect("/signup")}
    </div>
    
  )
}

export default Loader