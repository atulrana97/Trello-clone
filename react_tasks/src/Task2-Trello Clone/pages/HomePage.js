import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import config from '../config/config'
import { IoPersonOutline } from 'react-icons/io5'
import { DiTrello } from 'react-icons/di'
import PropTypes from 'prop-types'

function HomePage({ currentSearch }) {
  const [homePageData, setHomePageData] = useState([])
  const [newBoardName, setBoardName] = useState('')
  const [loading, setLoadingState] = useState(true)
  const formStyling = useRef(null)
  useEffect(() => {
    const fetch = async () => {
      const getHomePageData = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${config.key}&token=${config.token}`
      )

      setLoadingState(false)
      setHomePageData(getHomePageData.data)
    }

    fetch()
  }, [])
  const openForm = () => {
    if (formStyling.current.style.display === 'block') {
      formStyling.current.style.display = 'none'
    } else {
      formStyling.current.style.display = 'block'
    }
  }

  const createNewBoard = async (e) => {
    e.preventDefault()

    await axios.post(
      `https://api.trello.com/1/boards/?key=${config.key}&token=${config.token}&name=${newBoardName}`
    )
    const updatedBoards = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${config.key}&token=${config.token}`
    )
    setBoardName('')
    setHomePageData(updatedBoards.data)
    openForm()
  }
  const handleBoardName = (e) => {
    setBoardName(e.target.value)
  }
  if (loading) {
    return (
      <div className="loading">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        )
      </div>
    )
  }
  return (
    <div className="home-page-content">
      <div className="home-page" data-testid="homePage">
        <div className="sideBar">
          <div className="sidebar-div active">
            <DiTrello />
            <h1>Board</h1>
          </div>
          <div className="sidebar-div">
            <DiTrello />
            <h1>Templates</h1>
          </div>
        </div>
        <div className="home-page-block">
          <div className="home-page-title" data-testid="homePageTitle">
            <IoPersonOutline />
            <h1>Personal Boards</h1>
          </div>

          <div className="home-page-container">
            {homePageData
              .filter((ele) =>
                ele.name.toLowerCase().includes(currentSearch.toLowerCase())
              )
              .map((ele) => {
                return (
                  <Card
                    value={ele}
                    key={ele.id}
                    boardState={homePageData}
                    setHomePageData={setHomePageData}
                  ></Card>
                )
              })}
            <div className="add-button-wrapper">
              <div className="add-new-board">
                <div
                  className="add-board-card"
                  onClick={openForm}
                  data-testid="addNewBoard"
                >
                  <h1>Create New Board</h1>
                </div>
                <form
                  className="add-board-form"
                  ref={formStyling}
                  onSubmit={createNewBoard}
                >
                  <textarea
                    type="text"
                    placeholder="BoardName"
                    data-testid="inputForAddingBoard"
                    onChange={handleBoardName}
                  ></textarea>
                  <input
                    type="submit"
                    value="Create New Board"
                    data-testid="addBoardButton"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
HomePage.propTypes = {
  currentSearch: PropTypes.string
}
export default HomePage
