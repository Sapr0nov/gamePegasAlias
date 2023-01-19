import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BackLink } from '../components'

describe('BackLink', () => {
  it('тест BackLink', () => {
    const { container, getByText } = render(<BackLink text="test" />)
    // текст на кнопке
    expect(getByText('test')).toBeInTheDocument()
    // тег button закрыт
    expect(container.innerHTML).toMatch(/<button.+>.+<\/button>/)
  })

  it('click', () => {
    const { container } = render(<BackLink text="test" />)
    const isClick = fireEvent.click(container)
    expect(isClick).toBe(true)
  })
})
