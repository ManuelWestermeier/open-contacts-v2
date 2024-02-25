import React, { useEffect, useRef, useState } from 'react'
import SearchUser from './search-user'
import { useSearchParams } from 'react-router-dom'

function Search() {
    const [search, setSearch] = useSearchParams({ q: "" })
    const [userList, setUserList] = useState([])

    useEffect(() => {
        (async () => {
            var data = await API.get("search-for-user", search.get("q"))
            if (data)
                setUserList(data)
        })()
    }, [search])

    return (
        <main className="container">
            <br />
            <form
                onSubmit={async e => {
                    e.preventDefault()
                    var data = await API.get("search-for-user", search.get("q"))
                    if (data)
                        setUserList(data)
                }}
                className="form-inline my-2 my-lg-0" style={{ display: "flex", gap: "10px" }}>
                <input
                    value={search.get("q")}
                    onChange={e => setSearch({ q: e.target.value }, { replace: true })}
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                </button>
            </form>
            <br />
            {
                userList.length == 0 ?
                    <p>No Results</p>
                    :
                    <ul className="list-group list-group-flush">
                        {userList.map((data) => {
                            return <SearchUser data={data} key={data?.key ?? ""} />
                        })}
                    </ul>
            }
        </main>
    )
}

export default Search