import React from "react";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { getUserDetails, getWhitelistStatus } from '../../utils/api'
import logo from "../img/utils.png";

export function AppListPage({
    history,
}) {
    const [apps, setApps] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                getWhitelistStatus(data.discordId).then(({ data }) => {
                    if (data.message === "Yes") {
                        setLoading(false)
                    } else {
                        window.location.href = "/"
                    }
                }).catch(() => {
                    window.location.href = "/"
                })
            }).catch((err) => {
                window.location.href = "/"
            })
    }, [])

    function getApplications() {
        return axios.get('https://simplify-code.com/api/applist')/*.then(data => {
           for (let i in data.data) {
            console.log(data.data[i].appType)
           }
        })*/
    }

    React.useEffect(() => {
        getApplications()
            .then(({ data }) => {
                setApps(data)
                /*apps.map(app => {
                    console.log(app.discordId)
                })*/
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const [open, setOpen] = React.useState(false)

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        burger.classList.toggle('toggle')
    
        if (open) {
            setOpen(false)
        } else if (!open) {
            setOpen(true)
        }
    }

    function openWindowDiscord() {
        window.open("https://discord.gg/PaGJGzbzw6", "_blank")
    }

    return !loading && (
        <body>

            <nav>
                <div className={
                    "nav-bar " + (open ? 'open' : '')
                }>
                    <img src={logo} alt="" className="logo" onClick={openWindowDiscord} />
                    <ul className="navLinks">
                        <li><Link to="/rules" className="aa">Rules</Link></li>
                        <li><Link to="/faq" className="ab">FAQ</Link></li>
                        <li><Link to="/team" className="ab">Team</Link></li>
                        <li><Link to="/dashboard" className="ad">Dashboard</Link></li>

                    </ul>
                    <div className="burger" onClick={navSlide}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </nav>
            <div className="top"></div>

            <div className="application-list">
                <li key="app-list" className="app-tags">
                    <span className="name-tag">Name</span>
                    <span className="type-tag">Application Type</span>
                    <span className="date-tag">Applied on</span>
                </li>
                {apps.map(app => {
                    return (
                        <Link to={`/applications/review/${app.applicationId}`}>
                            <li key={app.applicationId} className="application-bar">
                                <span className="name">{app.user}#{app.tag} </span>
                                <span className="type">{app.appType} </span>
                                <span className="date">{app.date}</span>
                            </li>
                        </Link>
                    )
                })}
            </div>

            <div className="footer-container">
                <footer>
                    <div className="container">
                        <div className="about">
                            <h2>About</h2>
                            <p>Simplify Code is a coding community for everyone to join, we are growing more every day so why not join?</p>
                            <br />
                            <p>© Simplify Development 2020-2021</p>
                        </div>
                        <ul className="icons">
                            <li><a onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}><i class="fab fa-discord"></i></a></li>
                            <li><a onClick={() => window.open("https://github.com/Simplify-Development", "_blank")}><i class="fab fa-github"></i></a></li>
                            <li><a onClick={() => window.open("https://www.youtube.com/channel/UCkCQKpugToFwY_EWkI0GlWw", "_blank")}><i class="fab fa-youtube"></i></a></li>
                        </ul>
                    </div>

                    <div className="links">
                        <div className="product">
                            <h2>Product</h2>
                            <ul>
                                <Link to="/rules"><li><a >Rules</a></li></Link>
                                <Link to="/faq"><li><a >FAQ</a></li></Link>
                                <Link to="/privacy"><li><a >Privacy</a></li></Link>
                            </ul>
                        </div>
                        <div className="reacources">
                            <h2>Resources</h2>
                            <ul>
                                <li><a onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}>Support</a></li>
                                <li><a onClick={() => window.open("https://discord.gg/XveJX7Z", "_blank")}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </body>
    )
}