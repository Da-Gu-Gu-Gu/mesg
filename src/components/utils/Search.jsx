import React from 'react'
import './Search.css'
import {BiSearch} from 'react-icons/bi'
const Search = (props) => {
  return (
    <div className="container">
    <label htmlFor={props.id} className="sicon">
        <BiSearch />
    </label>
    <input type="text" className='search' value={props.value} id={props.id} placeholder='Search' onChange={(event)=>props.handler(event.target.value)}/>
    </div>
  )
}

export default Search