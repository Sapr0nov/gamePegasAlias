import React, { JSXElementConstructor, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SignUp } from '../pages/sign-up'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '../services/store/reducer'

describe('Register', () => {
  it('click Registration', () => {
    /* eslint-disable */
    let ReRender = function (
      _ui: ReactElement<any, string | JSXElementConstructor<any>>
    ) {
      // type global Rerender
    }
    act(() => {
      const { rerender } = render(
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="*" element={<SignUp />} />
            </Routes>
          </Provider>
        </BrowserRouter>
      )
      ReRender = rerender
    })
    const regBtn = document.querySelector('[title="Создать аккаунт"]')
    act(() => {
      fireEvent.click(regBtn!)
    })
    ReRender(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="*" element={<SignUp />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    )
    screen.debug()
    screen.findAllByText('Заполните поле')
  })

  it('click Authorization', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="*" element={<SignUp />} />
            </Routes>
          </Provider>
        </BrowserRouter>
      )
    })
    const authBtn = document.querySelector('[title="Уже есть аккаунт ?"]')
    act(() => {
      fireEvent.click(authBtn!)
    })
    expect(window.location.pathname).toBe('/login')
  })
})
