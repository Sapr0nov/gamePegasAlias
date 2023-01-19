import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Button } from '../components/button/button'

describe('Button', () => {
  it('some text', () => {
    const { container, getByText } = render(<Button text="Кнопка" />)
    // текст на кнопке
    expect(getByText('Кнопка')).toBeInTheDocument()
    // тег button закрыт
    expect(container.innerHTML).toMatch(/<button.+>.+<\/button>/)
  })
})
