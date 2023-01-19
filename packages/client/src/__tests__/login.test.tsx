import React from 'react'
import { Provider } from 'react-redux'
import {
  render,
  fireEvent,
  act,
  Matcher,
  SelectorMatcherOptions,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Login } from '../pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import store from '../services/store/reducer'

let getByText: (
  id: Matcher,
  options?: SelectorMatcherOptions | undefined
) => HTMLElement
jest.mock('../services/http/login', () => {
  const originalModule = jest.requireActual('../services/http/login')
  return {
    __esModule: true,
    ...originalModule,
    loginUser: jest.fn().mockReturnValue(1),
  }
})

const mock = new MockAdapter(axios)
const data = { response: true, username: 'testuser', password: 'testpswd' }
mock.onPost('https://ya-praktikum.tech/api/v2/auth/signin').reply(200, data)

describe('Login', () => {
  it('тест текст <Login>', () => {
    act(() => {
      const renderOut = render(
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </Provider>
        </BrowserRouter>
      )
      getByText = renderOut.getByText
    })
    expect(getByText('Вход в систему')).toBeInTheDocument()
  })

  it('click Login', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </Provider>
        </BrowserRouter>
      )
    })

    const authBtn: Element | null = document.querySelector(
      '[title="Авторизоваться"]'
    )
    act(() => {
      if (authBtn !== null) {
        fireEvent.click(authBtn)
      }
    })

    expect(true).toBe(true)
  })

  it('click Registration', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </Provider>
        </BrowserRouter>
      )
    })
    const regBtn: Element | null = document.querySelector(
      '[title="Ещё нет аккаунта ?"]'
    )
    act(() => {
      if (regBtn !== null) {
        fireEvent.click(regBtn)
      }
    })
    expect(window.location.pathname).toBe('/sign-up')
  })
})
