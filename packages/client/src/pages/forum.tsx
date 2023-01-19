import React from 'react'
import { BackLink, Forums } from '../components'
import { authorization } from '../utils'

export const ForumPage: React.FC = (): JSX.Element => {
  authorization()
  return (
    <>
      <header>
        <BackLink text="Форум" />
      </header>
      <main>
        <Forums />
      </main>
    </>
  )
}
