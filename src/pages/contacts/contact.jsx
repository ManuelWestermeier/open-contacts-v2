import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

function Contact({ id }) {
    const [name, setName] = useState("")

    useEffect(() => {
        API.get("user-name", id).then(setName)
    }, [])

    return <Link className="list-group-item" to={`/search/user/${id}`}>
        <li>{name}</li>
    </Link>
}

export default Contact