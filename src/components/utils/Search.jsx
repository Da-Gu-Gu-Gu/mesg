import React from 'react'
import './Search.css'
import {BiSearch} from 'react-icons/bi'
const Search = () => {
  return (
    <div className="container">
    <label htmlFor="search">
        <BiSearch />
    </label>
    <input type="text"  id="search" placeholder='Search'/>
    </div>
  )
}

export default Search