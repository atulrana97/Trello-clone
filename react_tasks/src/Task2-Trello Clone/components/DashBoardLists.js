import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import config from '../config/config'
import { BsThreeDots } from 'react-icons/bs'

function DashBoardLists({ list, getBoardsLists }) {
  const [currentListName, setCurrentListName] = useState(list.name)
  const [submitForm, setSubmit] = useState(false)
  const listChangeHandler = (e) => {
    setCurrentListName(e.target.value)
  }
  const updateListName = async (e, listId) => {
    e.preventDefault()
    await axios.put(
      `https://api.trello.com/1/lists/${listId}?key=${config.key}&token=${config.token}&name=${currentListName}`
    )
    const getLists = await axios.get(
      `https://api.trello.com/1/boards/${list.idBoard}/lists?key=${config.key}&token=${config.token}`
    )
    getBoardsLists(getLists.data)
    setSubmit(false)
  }
  const archiveList = async (listId) => {
    await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${config.key}&token=${config.token}&value=true`
    )
    const getLists = await axios.get(
      `https://api.trello.com/1/boards/${list.idBoard}/lists?key=${config.key}&token=${config.token}`
    )
    getBoardsLists(getLists.data)
  }
  return (
    <div className="list-name-container">
      <div
        className="board-list-name"
        data-testid="openListForm"
        onClick={() => {
          if (submitForm) {
            setCurrentListName(list.name)
            setSubmit(false)
          } else {
            setSubmit(true)
          }
        }}
      >
        <form
          onSubmit={(e) => {
            updateListName(e, list.id)
          }}
        >
          <input
            type="text"
            value={currentListName}
            data-testid="listNameInputField"
            onChange={(e) => {
              listChangeHandler(e)
            }}
          />
          <input
            type="submit"
            value="update"
            data-testid="updateListSubmitButton"
          />
        </form>
      </div>
      <div className="archive-list-button">
        <BsThreeDots
          onClick={() => archiveList(list.id)}
          data-testid="archiveListButton"
        />
      </div>
    </div>
  )
}
DashBoardLists.propTypes = {
  list: PropTypes.object,
  getBoardsLists: PropTypes.func
}
export default DashBoardLists
