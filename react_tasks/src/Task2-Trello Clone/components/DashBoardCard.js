import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import config from '../config/config'
import PropTypes from 'prop-types'
import '../task2.css'

function DashBoardCard({ card, getCardsForList, boardId }) {
  const [currentCardName, updateCurrentCard] = useState(card.name)

  const deleteCard = async (cardId) => {
    await axios.delete(
      `https://api.trello.com/1/cards/${cardId}?key=${config.key}&token=${config.token}`
    )
    const getCards = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/cards?key=${config.key}&token=${config.token}`
    )
    getCardsForList(getCards.data)
  }
  const updateCard = async (e, cardId) => {
    e.preventDefault()
    await axios.put(
      `https://api.trello.com/1/cards/${cardId}?key=${config.key}&token=${config.token}&name=${currentCardName}`
    )

    const getCards = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/cards?key=${config.key}&token=${config.token}`
    )
    getCardsForList(getCards.data)
  }

  const handleCardChange = (e) => {
    updateCurrentCard(e.target.value)
  }
  return (
    <div>
      <div className="cards" key={card.id}>
        <div className="update-card" key={card.id}>
          <form
            key={card.id}
            className="update-card-form"
            data-testid="updateForm"
            onSubmit={(e) => updateCard(e, card.id)}
          >
            <input
              type="text"
              className="current-card-title"
              data-testid="updateCardInputField"
              value={currentCardName}
              // onClick={() => setSubmit(true)}
              onChange={(e) => handleCardChange(e)}
            ></input>
            <input
              type="submit"
              value="update"
              className="update-card-button"
              data-testid="updateCardSubmitButton"
            />
          </form>
        </div>
        <div className="card-icons">
          <MdDelete
            onClick={() => deleteCard(card.id)}
            data-testid="deleteIcon"
          />
        </div>
      </div>
    </div>
  )
}
DashBoardCard.propTypes = {
  card: PropTypes.object,
  getCardsForList: PropTypes.func,
  boardId: PropTypes.string
}

export default DashBoardCard
