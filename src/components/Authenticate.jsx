import { useState } from "react"

export default function Authenticate({ token }) {
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    async function handleClick() {
        setError(null)

        try {
            if(!token) {
                throw new Error('You are not signed in')
            }

            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()

            setSuccessMessage(`${result.message} Welcome ${result.data.username.username}!`)

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <h2>Authenticate</h2>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            <button onClick={() => {handleClick()}}>Authenticate Token</button>
        </>
    )
}