import { useState } from "react"

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        setError(null)

        try {
            if (username.length < 5) {
                console.log('not long enough')
                throw new Error('Please choose a Username with at least 5 characters')
            } else if (password.length < 5) {
                throw new Error('Please choose a Password with at least 5 characters')
            }

            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: {username},
                    password: {password}
                })
            })
            const result = await response.json()

            setToken(result.token)

            console.log(result)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <label>Username: 
                <input
                    value={username}
                    onChange={(event) => {setUsername(event.target.value)}}
                />
            </label>
            <br/>
            <label>Password: 
                <input
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                />
            </label>
            <br/>
            <button type="submit">Sign in</button>
        </form>
    )
}