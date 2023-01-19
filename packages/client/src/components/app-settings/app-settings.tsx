import React from 'react'
import './app-settings.scss'
import { FullscreenBtn, ThemeBtn } from '../../components/'
import { useToggle } from '../../services/hooks'

export function AppSettings() {
  const [settingsPanelOpen, toggleSettingsPanel] = useToggle(false)

  return (
    <div
      className={
        settingsPanelOpen ? 'app-settings app-settings--open' : 'app-settings'
      }>
      <button className="app-settings__trigger" onClick={toggleSettingsPanel} />
      <div className="app-settings__togglers">
        <FullscreenBtn />
        <ThemeBtn />
      </div>
    </div>
  )
}
