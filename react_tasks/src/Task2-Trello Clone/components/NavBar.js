import React from 'react'
import '../task2.css'
import { useHistory } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { BiHomeAlt } from 'react-icons/bi'
import { DiTrello } from 'react-icons/di'
import { RiDashboardLine } from 'react-icons/ri'
import { AiOutlineBell } from 'react-icons/ai'
import { IoAdd } from 'react-icons/io5'
import PropTypes from 'prop-types'

function NavBar({ currentSearch, setCurrentSearch }) {
  const history = useHistory()
  function handleClick() {
    history.push('/')
  }
  const handleChange = async (e) => {
    setCurrentSearch(e.target.value)
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-setting">
          <RiDashboardLine />
        </div>
        <div className="navbar-left-home">
          <BiHomeAlt />
        </div>
        <div className="navbar-left-board">
          <DiTrello />
          <h1>Boards</h1>
        </div>
        <div className="navbar-left-search">
          <input
            type="text"
            placeholder="Jump to ..."
            value={currentSearch}
            data-testid="searchInputField"
            onChange={(e) => handleChange(e)}
          ></input>
          <BsSearch />
        </div>
      </div>
      <img
        src="/images/trello2.png"
        onClick={handleClick}
        data-testid="navBarHomeLink"
      ></img>
      <div className="navbar-right">
        <div className="navbar-left-search">
          <AiOutlineBell />
        </div>
        <div className="navbar-left-search">
          <IoAdd />
        </div>
      </div>
    </nav>
  )
}
NavBar.propTypes = {
  currentSearch: PropTypes.string,
  setCurrentSearch: PropTypes.func
}
export default NavBar
