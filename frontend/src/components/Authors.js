import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

const Authors = () => {
    const [authors, setAuthors] = useState([])

    const getAuthors = async () => {
        try {
            const response = await fetch('http://localhost:5050/authors')
            const data = await response.json()
            setAuthors(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAuthors()
    }, [])

    return (
        <>
            <h1>Authors</h1>
            <ol>
                {authors && authors.map((author) => {
                    return (
                        <li key={nanoid()}>
                            <b>{author.firstName} {author.lastName}</b>
                        </li>
                    )
                })}
            </ol>
        </>
    )
}

export default Authors