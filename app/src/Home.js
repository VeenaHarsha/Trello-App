import React from 'react'
import './App.css'

function Home () {
  return (
    <div className='home-container'>
      <div className='home-main-content'>
        <div className='background-image-div' />
        <div className='home-text-div'>
          <span>Stay up to date with Trello...</span>
        </div>
      </div>
      <div className='home-right-sidebar'>
        <strong>Recently Viewed...</strong>
      </div>
    </div>
  )
}
export default Home
