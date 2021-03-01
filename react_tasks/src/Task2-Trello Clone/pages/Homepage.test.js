/* istanbul ignore file */
import React from 'react'
import {
  render,
  waitFor,
  screen,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import HomePage from './HomePage'
import { MemoryRouter } from 'react-router-dom'
jest.setTimeout(25000)

beforeEach(() => {
  render(
    <MemoryRouter>
      <HomePage currentSearch="" />
    </MemoryRouter>
  )
})

describe('Test for HomePage', () => {
  it('should show HomePage title after api calls are made', async () => {
    const title = await waitFor(() => screen.getByTestId('homePageTitle'), {
      timeout: 3000
    })

    expect(title).toBeInTheDocument()
  })
  it('should check if input field is displayed when the clicked on board Name', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()

    fireEvent.click(addNewBoard)

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')

    expect(inputForAddingBoard).toBeInTheDocument()
  })
  it('should check if input field is closed when clicked again', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()

    fireEvent.click(addNewBoard)

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()

    fireEvent.click(addNewBoard)

    expect(screen.queryByText('BoardName')).toBe(null)
  })
  it('should check if New Board is created and deleted', async () => {
    const addNewBoard = await waitFor(() => screen.getByTestId('addNewBoard'), {
      timeout: 3000
    })
    expect(addNewBoard).toBeInTheDocument()

    fireEvent.click(addNewBoard)

    const inputForAddingBoard = screen.getByTestId('inputForAddingBoard')
    expect(inputForAddingBoard).toBeInTheDocument()

    fireEvent.change(inputForAddingBoard, {
      target: { value: 'createNewBoard' }
    })

    const addBoardButton = await waitFor(
      () => screen.getByTestId('addBoardButton'),
      {
        timeout: 3000
      }
    )

    fireEvent.click(addBoardButton)

    const deleteButton = await waitFor(
      () => screen.getByTestId('createNewBoard'),
      {
        timeout: 3000
      }
    )
    expect(deleteButton).toBeInTheDocument()

    fireEvent.click(deleteButton)

    await waitForElementToBeRemoved(
      () => screen.getByTestId('createNewBoard'),
      {
        timeout: 3000
      }
    )
    expect(screen.queryByTestId('createNewBoard')).toBe(null)
  })
})
