import React from 'react'
import Contact from './contact'

function Contacts({ contacts }) {
    const ContactKeys = Object.keys(contacts)

    return (
        <main className="container">
            <br />
            {
                ContactKeys.length == 0 ?
                    <h4>No Contacts Added</h4>
                    :
                    <ul className="list-group list-group-flush">
                        {ContactKeys.map((id) => {
                            return <Contact key={id} id={id} />
                        })}
                    </ul>
            }
        </main>
    )
}

export default Contacts