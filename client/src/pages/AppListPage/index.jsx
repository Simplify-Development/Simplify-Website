import React from "react";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { getUserDetails } from '../../utils/api'

export function AppListPage({
    history,
}) {
    const [apps, setApps] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                if (data.whitelisted === false) {
                    //return window.location.href = "/"
                }

                setLoading(false)
            }).catch((err) => {
                //window.location.href = "/"
                setLoading(false)
            })
    }, [])

    function getApplications() {
        return axios.get('https://simplify-code.com/api/applist')/*.then(data => {
           for (let i in data.data) {
            console.log(data.data[i].appType)
           }
        })*/
    }

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links')
        const navLinks = document.querySelectorAll('.nav-links a')

        // Toggle Links
        nav.classList.toggle('nav-active')


        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`
            }
        })

        //Burger Animation
        burger.classList.toggle('toggle')
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

    return !loading && (
        <body>
            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                        <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.com/invite/96MAcmwA", "_blank")
                        }}>Discord</a></li></Link>
                        <Link to="/faq"><li><a className="ab" >Faq</a></li></Link>
                        <Link to="/rules"><li><a className="ac" >Rules</a></li></Link>
                        <Link to="/"><li><a className="ad" >Home</a></li></Link>
                    </ul>

                    <div className="burger" onClick={navSlide}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>

                <Link to="/dashboard">
                    <button className="login-btn">
                        Dashboard
                    </button>
                </Link>
            </div>

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
                            <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}><i class="fab fa-discord"></i></a></li>
                            <li><a onClick={() => window.open("https://github.com/Simplify-Development", "_blank")}><i class="fab fa-github"></i></a></li>
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
                                <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}>Support</a></li>
                                <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </body>
    )
}