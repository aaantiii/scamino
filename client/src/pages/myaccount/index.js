import './style.css'
import { useState } from 'react'

import AccountSettings from './MenuTabs/AccountSettings'
import TransactionHistory from './MenuTabs/TransactionHistory'
import BetHistory from './MenuTabs/BetHistory'

const tabs = {
  AccountSettings,
  TransactionHistory,
  BetHistory
}

export default function MainMenu() {
  const [activeTab, setActiveTab] = useState(<tabs.AccountSettings />)

  function changeActiveTab(tab, tabButton) {
    setActiveTab(tab)
    document.querySelector('li.tab.active').classList.remove('active')
    tabButton.classList.add('active')
  }

  return (
    <div id="main-menu">
      <ul>
        <li className="tab active" tabIndex="1" onClick={(e) => changeActiveTab(<tabs.AccountSettings />, e.target)}>Kontoeinstellungen</li>
        <li className="tab" tabIndex="2" onClick={(e) => changeActiveTab(<tabs.TransactionHistory />, e.target)}>Transaktionen</li>
        <li className="tab" tabIndex="3" onClick={(e) => changeActiveTab(<tabs.BetHistory />, e.target)}>Wettverlauf</li>
      </ul>
      <div id="active-tab">
        {activeTab}
      </div>
    </div>
  )
}
