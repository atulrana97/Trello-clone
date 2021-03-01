import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'

import { MemoryRouter, Route } from 'react-router-dom'
import Dashboard from './Dashboard'

jest.setTimeout(25000)

describe('<Dashboard/>', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      finalId: '6038e8d33e209d2833fb9bd5'
    })
  }))
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/dashBoard/6038e8d33e209d2833fb9bd5']}>
        <Route path="/dashBoard/:finalId">
          <Dashboard />
        </Route>
      </MemoryRouter>
    )
  })

  it('should check if input field is closed when the clicked on close icon', async () => {
    const openBoardForm = await waitFor(
      () => screen.getByTestId('openBoardNameUpdateForm'),
      {
        timeout: 3000
      }
    )
    expect(openBoardForm).toBeInTheDocument()
    fireEvent.click(openBoardForm)
    const closeBoardForm = await waitFor(() => screen.getByTestId('cancel'), {
      timeout: 3000
    })
    expect(closeBoardForm).toBeInTheDocument()
    fireEvent.click(closeBoardForm)
  })
  it('should check is the board name is updated successfully', async () => {
    const updateBoardName = await waitFor(
      () => screen.getByTestId('openBoardNameUpdateForm'),
      {
        timeout: 3000
      }
    )
    expect(updateBoardName).toBeInTheDocument()

    fireEvent.click(updateBoardName)

    const updateBoardInputField = await waitFor(
      () => screen.getByTestId('updateFormInputField'),
      {
        timeout: 3000
      }
    )

    expect(updateBoardInputField).toBeInTheDocument()

    fireEvent.change(updateBoardInputField, {
      target: { value: 'NewName 2' }
    })

    fireEvent.change(updateBoardInputField, {
      target: { value: 'NewName' }
    })

    const updateBoardSubmitButton = await waitFor(
      () => screen.getByTestId('updateFormSubmitButton'),
      {
        timeout: 3000
      }
    )

    fireEvent.click(updateBoardSubmitButton)

    const getUpdatedName = await waitFor(() => screen.getByTestId('NewName'), {
      timeout: 3000
    })
    expect(getUpdatedName).toBeInTheDocument()
  })
})

describe('<DashBoard />', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      finalId: '6038e96f0be5d13faeeee4de'
    })
  }))
  it('should check if input field is displayed when the clicked on add List', async () => {
    render(
      <MemoryRouter initialEntries={['/dashBoard/6038e96f0be5d13faeeee4de']}>
        <Route path="/dashBoard/:finalId">
          <Dashboard />
        </Route>
      </MemoryRouter>
    )
    const pageBackground = await waitFor(
      () => screen.findByTestId('pageBackground'),
      {
        timeout: 3000
      }
    )
    expect(pageBackground).toBeInTheDocument()
  })
})
