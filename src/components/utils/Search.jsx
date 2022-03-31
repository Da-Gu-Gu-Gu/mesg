import React from 'react'
import './Search.css'
import {BiSearch} from 'react-icons/bi'
const Search = (props) => {
  return (
    <div className="container">
    <label htmlFor={props.id} className="sicon">
        <BiSearch />
    </label>
    <input type="text" className='search' id={props.id} placeholder='Search'/>
    </div>
  )
}

export default Search