import './style.css'
import React from 'react'
import { getUserDetails } from '../../../utils/api'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function NavLoginDashboard() {

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [user, setUser] = React.useState(null)
    const [open, setOpen] = React.useState(false)

    async function logout() {
        await axios.post("https://simplify-code.com/api/logout", { id: user.discordId }).then(() => {
            setLoggedIn(false)
        })
    }

    React.useEffect(() => {
        const userDate = window.localStorage.getItem("Simplify-Code")
        setUser(JSON.parse(userDate))
    }, [])
    React.useEffect(() => {
        window.localStorage.setItem('Simplify-Code', JSON.stringify(user))
    })

    React.useEffect(() => {
        if (user) return setLoggedIn(true)
        getUserDetails()
            .then(({ data }) => {
               setLoggedIn(true)
               setUser(data)
            }).catch(() => {
                setLoggedIn(false)
            })
    }, [])

    if (loggedIn) {
        return (
            <div>
                <div className={"navLogin " + (open ? "open" : "")} onClick={() => setOpen(!open)}>
                    <img className="navLogin-avatar" src={user.avatar} alt="" />
                    <span className="navLogin-username">{user.username}</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <div className={"menu " + (open ? "open" : "")}>
                    <Link to="/"><p>Home</p></Link>
                    <Link to="/dashboard/report"><p>Report</p></Link>
                    <p className="logout" onClick={logout}>Logout</p>
                </div>
            </div>
        )
    } else {
        return (
                <button className="login" onClick={() => window.location.href = `https://simplify-code.com/api/auth/discord`}>Login</button>
        )
    }
}