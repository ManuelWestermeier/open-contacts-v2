import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function You() {
    const [userData, setUserData] = useState(false)
    const [error, setError] = useState("")
    const nameInput = useRef()
    const descriptionInput = useRef()
    const emailInput = useRef()
    const positionInput = useRef()
    const telInput = useRef()
    const websiteInput = useRef()

    useEffect(() => {
        API.get("user-data", user).then(setUserData);
    }, [])

    return (
        <main className="container">
            <br />
            <h1>Your Profile</h1>
            <p className='text-danger'>{error}</p>
            {userData && <form className="form-inline my-2 my-lg-0" onSubmit={async e => {
                e.preventDefault()

                const newData = {
                    description: descriptionInput?.current?.value ?? "",
                    email: emailInput?.current?.value ?? "",
                    name: nameInput?.current?.value ?? "",
                    position: positionInput?.current?.value ?? "",
                    tel: telInput?.current?.value ?? "",
                    website: websiteInput?.current?.value ?? "",
                }

                setUserData(false)

                setError("Loading")

                if (await API.get("update-profile-data", newData))
                    setUserData(await API.get("user-data", user))

                setError("Up To Date")

            }}>
                <p>Name</p>
                <input defaultValue={userData.name} ref={nameInput} className="form-control mr-sm-2 mb-2" type="text" placeholder="Name..." aria-label="text" />
                <p>Description</p>
                <textarea defaultValue={userData.description} ref={descriptionInput} className="form-control mr-sm-2 mb-2" placeholder="Description..." aria-label="text" >
                </textarea>
                <p>E-Mail</p>
                <input defaultValue={userData.email} ref={emailInput} className="form-control mr-sm-2 mb-2" type="email" placeholder="E-Mail..." aria-label="text" />
                <p>Tel</p>
                <input defaultValue={userData.tel} ref={telInput} className="form-control mr-sm-2 mb-2" type="tel" placeholder="Tel..." aria-label="text" />
                <p>Website</p>
                <input defaultValue={userData.website} ref={websiteInput} className="form-control mr-sm-2 mb-2" type="url" placeholder="Website..." aria-label="text" />
                <p>Location</p>
                <input defaultValue={userData.position} ref={positionInput} className="form-control mr-sm-2 mb-2" type="text" placeholder="Location..." aria-label="text" />
                <button className="btn btn-primary my-2 my-sm-0" type="submit" style={{ marginRight: "8px" }}>
                    Update
                </button>
                <Link to={`/search/user/${user}`} className='btn'>
                    View Your User
                </Link>
                <br />
                <br />
            </form>}
        </main>
    )
}

export default You