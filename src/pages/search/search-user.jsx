import React from 'react'
import { Link } from "react-router-dom"

function SearchUser({ data = { key, name: "" } }) {
  return <Link className="list-group-item" to={`/search/user/${data.key}`}>
    <li>{data.name}</li>
  </Link>
}

export default SearchUser