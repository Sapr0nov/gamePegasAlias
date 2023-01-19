import React from 'react'
import './fullscreen-btn.scss'
import fullscreenIcon from '@/assets/images/fullscreen.svg'

export function FullscreenBtn() {
  function handleClick(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.body.requestFullscreen()
    }
  }

  return (
    <div className="fullscreen-btn" onClick={handleClick} title="На весь экран">
      <img src={fullscreenIcon} alt="На весь экран" />
    </div>
  )
}
