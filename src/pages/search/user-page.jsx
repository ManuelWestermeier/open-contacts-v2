import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

function UserPage({ contacts, setContacts }) {
    const { id } = useParams()
    const [userData, setUserData] = useState(false)

    useEffect(() => {
        (async () => {
            var data = await API.get("user-data", id);
            setUserData(data)
        })()
    }, [id])

    return (
        <main className='container'>
            {userData && <div className="form-inline my-2 my-lg-0" >
                <h1>{userData.name}</h1>
                <hr />
                <div>
                    <button
                        onClick={e => {
                            navigator.share({
                                url: document.location,
                                title: `add ${userData.name} on Opnen-Contacts-V2`
                            })
                        }}
                        className='btn btn-secoundary'
                        style={{ marginRight: "5px" }}>
                        Share
                    </button>
                    {contacts?.[id] ?
                        <button onClick={e => {
                            setContacts(old => {
                                var newContacts = { ...old }
                                delete newContacts[id]
                                return newContacts
                            })
                        }} className='btn btn-danger'>
                            Remove Contact
                        </button>
                        :
                        <button onClick={e => {
                            setContacts(old => {
                                return {
                                    ...old,
                                    [id]: true
                                }
                            })
                            document.location.hash = "/contacts"
                        }} className='btn btn-primary'>
                            Add To Contacts
                        </button>}
                </div>
                <hr />
                {userData.description.split("\n").map((text, i) => <div key={i}>{text}</div>)}
                <div>
                    <a href={`mailto:${userData.email}`}>{userData.email}</a>
                </div>
                <div>
                    <a href={`tel:${userData.tel}`}>{userData.tel}</a>
                </div>
                <div>
                    <a href={userData.website}>{userData.website}</a>
                </div>
                <div>
                    <a href={`https://google.com/search?q=${encodeURIComponent(userData.position)}`}>
                        {userData.position}
                    </a>
                </div>
                <br />
                <br />
            </div>}
        </main >
    )
}

export default UserPage