import React from 'react'
import { auth } from '../firebase'
import { Button } from '@material-tailwind/react'

function Main() {
  return (
    <div>
      <div onClick={()=>{auth.signOut()}} className='logout-btn'>
            <Button>Log Out</Button>
            </div>
    </div>
  )
}

export default Main
