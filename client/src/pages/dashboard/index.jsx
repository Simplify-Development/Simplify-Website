import React from "react";
import { getUserDetails } from "../../utils/api";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import CountUp from 'react-countup';
import { toast } from 'react-toastify'

export function DashboardPage({
    history,
}) {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true)
    const [count, setCount] = React.useState(0);
    const [apps, setApps] = React.useState(0)
    const [applications, setApplications] = React.useState([])

    const getNumberOfUsers = () => {
        axios.get('https://simplify-code.com/api/users')
            .then((res) => {
                const data = res.data;
                setCount(data)
            })
            .catch(() => {
                console.log('There was an error getting the number of users.')
            })
    }
    getNumberOfUsers()

    const getNumberOfApps = () => {
        axios.get('https://simplify-code.com/api/apps')
            .then((res) => {
                const data = res.data;
                setApps(data)
            })
            .catch(() => {
                console.log('There was an error getting the number of applications.')
            })
    }
    getNumberOfApps()

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

    function getUsersApplications() {
        return axios.get(`https://simplify-code.com/api/applist`)
    }


    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                setUser(data);
                console.log(data)
                setLoading(false);
            }).catch((err) => {
                console.error(err)
                window.location.href = `https://simplify-code.com/api/auth/discord`
            })
    }, [])

    React.useEffect(() => {
        getUsersApplications().then(({ data }) => {
            const result = data.filter(id => data.discordId === `${user.discordId}`);
            setApplications(result);
        })
    }, [])

    return !loading && (
        <body>

            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                        <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.gg/XveJX7Z", "_blank")
                        }}>Discord</a></li></Link>
                        <Link to="/rules"><li><a className="ab" >Rules</a></li></Link>
                        <Link to="/faq"><li><a className="ac" >FAQ</a></li></Link>
                        <Link to="/team"><li><a className="ad" >Team</a></li></Link>
                    </ul>

                    <div className="burger" onClick={navSlide}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>

                <Link to="/">
                    <button className="login-btn">
                        Home
                    </button>
                </Link>
            </div>

            <div className="info-container">

                <div className="info-box">
                    <h2>Total Users</h2>
                    <h1>
                        <CountUp end={count} />
                    </h1>
                </div>

                <div className="info-box">
                    <h2>Total Applications</h2>
                    <h1>
                        <CountUp end={apps} />
                    </h1>
                </div>
            </div>

            <div className="app-container">
                <div className="app-box">
                    <h1>Your Applications</h1>
                    <Link to="/applications">
                        <button className="application-btn">
                            <i class="fas fa-pencil-alt"></i>New
                        </button>
                    </Link>
                </div>

                <li className="dashboard-tags" key="tags">
                    <span>Application</span>
                    <span>Status</span>
                    <span>Applied on</span>
                </li>

                {applications.map(app => {
                    return (
                        <li key={app.applicationId} className="dashboard-bar">
                            <span>{app.appType} </span>
                            <span>Pending </span>
                            <span>{app.date}</span>
                        </li>
                    )
                })}
            </div>

            <div className="dummy"></div>

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
