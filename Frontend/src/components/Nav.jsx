import React from 'react'
import {FaUserCircle,} from "react-icons/fa"
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <div className="flex items-center justify-between text-3xl p-5 text-white">
        <div>
        <p className="pl-4  text-[2rem">Generative AI</p>
        </div>
        <div>
          <Link to="/image" className='text-xl capitalize'>Image genrator</Link>
        </div>
        <div>
        <FaUserCircle />
        </div>
        
      </div>
  )
}

export default Nav